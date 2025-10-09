import { onBeforeMount, onBeforeUnmount, onMounted, type Ref, ref } from "vue";

export const useScreenSize = () => {

    const isSmallScreen = ref(false)
    const isSmallScreen480 = ref(false)
    const breakPoint : Ref<'sm' | 'md' | 'lg' | 'xl' | 'xxl'> = ref('sm')
    const checkScreenSize = () => {
        const w = window.innerWidth;
        isSmallScreen.value = w <= 370
        isSmallScreen480.value = w < 480

        if (w < 576) {
            breakPoint.value = 'sm';
        } else if (w >= 576 && w < 768) {
            breakPoint.value = 'sm';
        } else if (w >= 768 && w < 992) {
            breakPoint.value = 'md';
        } else if (w >= 992 && w < 1200) {
            breakPoint.value = 'lg';
        } else if (w >= 1200 && w < 1400) {
            breakPoint.value = 'xl';
        } else if (w >= 1400) {
            breakPoint.value = 'xxl';
        }

    }

    const isMobile = ref(false)
    onBeforeMount(() => {
        isMobile.value = window.innerWidth < 768
    })

    onMounted(() => {
        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', checkScreenSize)
    })

    return {
        isMobile, isSmallScreen, isSmallScreen480, breakPoint
    }
}