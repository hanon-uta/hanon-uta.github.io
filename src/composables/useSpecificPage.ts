import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useHeadMeta } from "@/composables/useHeadMeta.ts";
import { useLoadingStore } from "@/stores/loading.ts";

export const useSpecificPage = () => {
    onMounted(async () => {
        const route = useRoute();
        useHeadMeta(ref<[]> ([]), ref<string>(route.meta.title), true);
        useLoadingStore().completeLoading();
    })
};