// stores/storage-store.ts
import { defineStore, storeToRefs } from "pinia";
import { debounceFn } from "@/utils/placeholderUtils.ts";
import { uploadFavorites, downloadFavorites, FavoriteSync } from "@/utils/syncFavorites";
import { useAuthStore } from "@/stores/auth-store.ts";
import { JsonUtils } from "@/utils/jsonUtils.ts";
import type { FavoriteData } from "@/types/favorite";

interface StorageState {
    favorites: Set<string>;
    favoriteRemoving: Set<string>;
    _debouncedRemove: Map<string, ReturnType<typeof debounceFn>>;
    _debouncedUpload: ReturnType<typeof debounceFn> | null;
    favoriteSyncing: boolean;
}

function initOrGetFavoriteLocal() : FavoriteData {
    let local = JsonUtils.fromJson<FavoriteData>(localStorage.getItem("favorites"));
    return {
        syncMs: local?.syncMs ?? 0,
        updateMs: local?.updateMs ?? 0,
        version: local?.version ?? 0,
        ids: local?.ids??[],
    }
}

export const useFavoriteStore = defineStore("favorite-storage", {
    state: (): StorageState => ({
        favorites: new Set(),
        favoriteRemoving: new Set(),
        _debouncedRemove: new Map(),
        _debouncedUpload: null,
        favoriteSyncing: false,
    }),

    getters: {
        favoritesSet: (state) => new Set([...state.favorites, ...state.favoriteRemoving]),
    },

    actions: {
        async loadFavorites() : Promise<number> {
            if (this.favoriteSyncing) {
                return 2;
            }
            const local = initOrGetFavoriteLocal();
            this.favorites = new Set([...local.ids]);
            local.ids = Array.from(this.favorites);
            return this.trySync(local);
        },

        async addFavorite(songId: string) {
            if (!this.favorites.has(songId)) {
                this.favorites.add(songId);
                this.favorites = new Set(this.favorites);

                this.favoriteRemoving.delete(songId);
                this._debouncedRemove.get(songId)?.cancel?.();
                this._debouncedRemove.delete(songId);
                await this.saveFavorites();
            }
        },

        async removeFavorite(songId: string) {
            if (this.favorites.delete(songId)) {
                this.favorites = new Set(this.favorites);

                this.favoriteRemoving.add(songId);
                if (!this._debouncedRemove.has(songId)) {
                    this._debouncedRemove.set(
                        songId,
                        debounceFn(() => {
                            this.favoriteRemoving.delete(songId);
                        }, 18080)
                    );
                }
                this._debouncedRemove.get(songId)!();
                await this.saveFavorites();
            }
        },

        async saveFavorites() {
            const local = initOrGetFavoriteLocal();
            local.ids = Array.from(this.favorites);
            local.updateMs = Date.now();
            this._debouncedUpload?.cancel?.();
            useAuthStore().refreshTime();
            this._debouncedUpload = debounceFn(() => this.trySync(local), 3000);
            this._debouncedUpload();
        },
        async trySync(local : FavoriteData) : Promise<number> {
            if (this.favoriteSyncing) {
                return 0;
            }
            this.favoriteSyncing = true;
            try {
                // Save once before syncing
                localStorage.setItem("favorites", JsonUtils.toJson(local));

                // Try cloud merge (skip if no login or network error)
                let authStore = useAuthStore();
                const { isLoggedIn } = storeToRefs(authStore);
                if (!isLoggedIn.value) {
                    return 3;
                }
                const remote = await downloadFavorites();

                // Perform synchronization
                const syncResult = FavoriteSync.sync(local, remote);
                if (syncResult.needUpdateCloud) {
                    await uploadFavorites(syncResult.cloud, remote.fileId).then(() => {
                        localStorage.setItem("favorites", JsonUtils.toJson(syncResult.local));
                        this.favorites = new Set(syncResult.local.ids);
                    })
                } else {
                    localStorage.setItem("favorites", JsonUtils.toJson(syncResult.local));
                    this.favorites = new Set(syncResult.local.ids);
                }
                return 1;
            } catch (e) {
                console.warn("Drive sync skipped:", e);
                return -1;
            } finally {
                this.favoriteSyncing = false;
            }
        }
    },
});
