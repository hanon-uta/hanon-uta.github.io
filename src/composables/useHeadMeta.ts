import { computed, type Ref } from "vue";
import { SITE_BRAND, SITE_DESC, SITE_SUFFIX } from "@/config/constants.ts";
import { useHead } from "@vueuse/head";
import { generateMeta } from "@/utils/meta.ts";
import { useRoute } from "vue-router";
import type { Song } from "@/types/song";

export const useHeadMeta = (filteredSongs: Ref<Song[]>, searchQuery: Ref<String>, page? : boolean) => {
    const route = useRoute();
    const vtuber = page ? SITE_BRAND : `${ route.meta.title ?? SITE_BRAND }`;
    const pageTitle = computed(() => {
        const baseTitle = `${ vtuber }${ SITE_SUFFIX }`;

        if (searchQuery.value && searchQuery.value.trim() !== '') {
            if (filteredSongs.value.length > 0) {
                // Search results page
                return `${ searchQuery.value.trim() } | ${ vtuber }さんが歌った回を一覧`;
            }
            if (page) {
                return `${searchQuery.value} | ${ baseTitle }`;
            }
        }

        return baseTitle;
    });

    const pageDescription = computed(() => {
        if (searchQuery.value && searchQuery.value.trim() !== '' && filteredSongs.value.length > 0) {
            // Search results page (with song title)
            return `「${ searchQuery.value.trim() }」を${ vtuber }さんが歌った配信回を完全網羅。YouTube該当時間へ直接ジャンプできる非公式ファンサービス。`;
        }
        // Home/Default Page
        return `${ vtuber }${ SITE_DESC }`;
    });

    // share head
    useHead(generateMeta(route.meta.favicon ?? 'favicon.png', pageTitle, pageDescription, filteredSongs))
}