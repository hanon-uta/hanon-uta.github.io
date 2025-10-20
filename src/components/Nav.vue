<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { VTUBER_KEYS, VTUBER_URIS } from "@/config/constants.ts";
import { useColorModeStore } from "@/stores/color-mode.ts";
import { useModalInitStore } from "@/stores/modal-init.ts";
import { storeToRefs } from "pinia";
import { replaceQueryParam } from "@/utils/routerUtils.ts";
import UserInfo from "@/components/UserInfo.vue";
import { useAuthStore } from "@/stores/auth-store.ts";

const router = useRouter();
const route = useRoute();
const { isDark } = storeToRefs(useColorModeStore())

const menuRoutes = computed(() => {
  return router.getRoutes()
    .filter(r => !r.meta.disabled)
    .filter(r => VTUBER_KEYS.includes(r.name as string));
})

const isMenuRoute = computed(() => {
  const firstSegment = "/" + window.location.pathname.split('/').filter(Boolean)[0] || '';
  return VTUBER_URIS.includes(firstSegment)
})

const currentRouteTitle = computed(() => {
  return (router.currentRoute.value.meta.title || 'ページを選択')
      + (router.currentRoute.value.meta.mark ?? '')
})

const modalInitStore = useModalInitStore()

const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);
</script>

<template>
  <nav v-if="isMenuRoute" class="d-flex justify-content-between my-4">
    <div class="dropdown">
      <button
          class="btn dropdown-toggle"
          :class="isDark ? 'btn-dark border' : 'btn-light'"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
      >
        {{ currentRouteTitle }}
      </button>
      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
        <li v-for="route in menuRoutes" :key="route.path">
          <router-link
              class="dropdown-item"
              :to="route.path"
          >
            {{ route.meta.title }}{{ route.meta.mark }}
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Button trigger modal -->
    <div class="d-flex justify-content-between my-gap-2">
      <div class="position-relative">
        <button class="btn" :class="isDark ? 'btn-dark border' : 'btn-light'" data-bs-target="#staticBackdrop" data-bs-toggle="modal" type="button"
                @click="modalInitStore.triggerSongInfoInit()">
          <i class="iconfont icon-gequliebiao"></i> <span class="d-none d-xxs2-inline">曲リスト</span>
        </button>
      </div>
      <div class="dropdown">
        <button class="btn dropdown-toggle position-relative" :class="isDark ? 'btn-dark border' : 'btn-light'" id="dropdownMenuReadme" data-bs-toggle="dropdown" type="button">
          <i class="iconfont icon-gongnengkaiguan"></i>
          <span class="visually-hidden">説明書</span>
          <span class="position-absolute top-0 start-100 translate-middle p-2 border border-light rounded-circle"
            :class="[ isLoggedIn ? 'bg-success' : 'bg-secondary' ]" v-tooltip="isLoggedIn ? 'オンライン' : 'オフライン'">
            <span class="visually-hidden">{{ isLoggedIn ? 'オンライン' : 'オフライン' }}</span>
          </span>
        </button>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuReadme">
          <UserInfo />
          <li >
            <button class="dropdown-item" @click="replaceQueryParam(router, route, 'filter', 'favorite')">お気に入りの曲</button>
          </li>
          <li class="dropdown-item cursor-pointer" data-bs-toggle="modal" data-bs-target="#exampleModal2" @click="modalInitStore.triggerStatsInit()">
            歌唱統計
          </li>
          <li><hr class="dropdown-divider"></li>
          <li>
            <a class="dropdown-item" href="https://github.com/hanon-uta/hanon-uta.github.io/blob/main/README.md" target="_blank" rel="noopener noreferrer">
              このサイドについて
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@media (min-width: 400px) {
  .d-xxs2-inline {
    display: inline !important;
  }
}
</style>