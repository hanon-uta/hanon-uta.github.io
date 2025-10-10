import { useFavoriteStore } from "@/stores/favorite-store.ts";
import { useAuthStore } from "@/stores/auth-store.ts";
import { storeToRefs } from "pinia";
import { realTimeCheckLogin, signIn } from "@/utils/googleAuth.ts";
import { useMessageToast } from "@/composables/useMessageToast.ts";
import { sleep } from "@/utils/timeUtils.ts";

export const useSyncFavorite = () => {
    const authStore = useAuthStore();
    const { isLoggedIn } = storeToRefs(authStore);
    const storageStore = useFavoriteStore();

    async function syncFavorites(toast: boolean) {
        await realTimeCheckLogin();
        if (!isLoggedIn.value) {
            await signIn();
            await sleep(1000);
        }
        await storageStore.loadFavorites().then((errorCode) => {
            if (errorCode === 3) {
                authStore.refreshTime();
                sleep(233);
                if (isLoggedIn.value) {
                    errorCode = 2;
                }
            }
            toast && showToast(errorCode);
        })
    }
    function showToast(code: number) {
        const { show } = useMessageToast();
        if (code === 1) {
            show('お気に入りの曲を同期しました！')
        } else if (code === 2) {
            show('操作が早すぎます。しばらく待ってから再度お試しください！')
        } else if (code === 3) {
            show('ログインの有効期限が切れました。再度ログインしてください！')
        } else {
            show('通信エラーのため、同期できませんでした。')
        }
    }

    return {
        syncFavorites
    }
}