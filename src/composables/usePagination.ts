import { computed, onMounted, ref, type Ref, watch } from "vue";
import type { Song } from "@/types/song";
import { DEFAULT_PAGE_SIZE } from "@/config/constants.ts";

export const usePagination = (isMobile: Ref<boolean>, breakPoint : Ref<'sm' | 'md' | 'lg' | 'xl' | 'xxl'>, filteredSongs: Ref<Song[]>,
                              currentPage: Ref<number>, itemsPerPage: Ref<number>, goToPage: Ref<number>) => {

    // paginated data
    const paginatedSongs = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value
        const end = start + itemsPerPage.value
        return filteredSongs.value.slice(start, end)
    })
    // total number of pages
    const totalPages = computed(() => {
        return Math.ceil(filteredSongs.value.length / itemsPerPage.value)
    })

    // change the page number
    const changePage = (page: number) => {
        if (currentPage.value === page) {
            return;
        }

        // Boundary checks
        const validatedPage = Math.max(1, Math.min(page, totalPages.value));
        currentPage.value = goToPage.value = validatedPage;
    }


    // mobile pagination
    const loadedSongs = ref<Song[]>([])

    watch([ isMobile, filteredSongs ], () => {
        if (isMobile.value) {
            // The first page is loaded on mobile
            loadedSongs.value = filteredSongs.value.slice(0, itemsPerPage.value)
        }
    })

    function reCalcCurrentPage(oldPage : number, oldPageSize : number, newPageSize : number) {
        const firstIndex = (oldPage - 1) * oldPageSize
        if (oldPageSize < newPageSize) {
            return Math.max(1, Math.min( Math.floor(firstIndex / newPageSize) + 1, totalPages.value))
        } else {
            return Math.max(1, Math.min( Math.ceil(firstIndex / newPageSize) + 1, totalPages.value))
        }
    }

    watch([ breakPoint ], () => {
        const oldPageSize = itemsPerPage.value;
        if (breakPoint.value === 'xxl') {
            itemsPerPage.value = DEFAULT_PAGE_SIZE;
        } else if (breakPoint.value === 'xl' || breakPoint.value === 'lg') {
            itemsPerPage.value = 12;
        }
        if (oldPageSize === itemsPerPage.value) {
            return;
        }
        currentPage.value = goToPage.value = reCalcCurrentPage(currentPage.value, oldPageSize, itemsPerPage.value);
    })

    const loadMore = () => {
        const nextLength = loadedSongs.value.length + itemsPerPage.value
        loadedSongs.value = filteredSongs.value.slice(0, nextLength)
    }
    const observerTarget = ref<HTMLElement | null>(null)
    onMounted(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && isMobile.value) {
                loadMore()
            }
        })
        if (observerTarget.value) {
            observer.observe(observerTarget.value)
        }
    })

    return {
        changePage, paginatedSongs, totalPages,

        loadedSongs, observerTarget
    }
}