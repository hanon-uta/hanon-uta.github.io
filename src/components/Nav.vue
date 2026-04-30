<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { VTUBER_KEYS, VTUBER_URIS, VTUBERS } from "@/config/constants.ts";
import { useModalInitStore } from "@/stores/modal-init.ts";
import { storeToRefs } from "pinia";
import { replaceQueryParam } from "@/utils/routerUtils.ts";
import UserInfo from "@/components/UserInfo.vue";
import { useAuthStore } from "@/stores/auth-store.ts";
import { watch } from 'vue'

const router = useRouter();
const route = useRoute();

const menuRoutes = computed(() =>
  router.getRoutes().filter(r => !r.meta.disabled && VTUBER_KEYS.includes(r.name as string))
)

const isMenuRoute = computed(() => {
  const p = router.currentRoute.value.path
  return p === '/' || VTUBER_URIS.includes(p.replace(/\/$/, ''))
})

const currentRouteName = computed(() => router.currentRoute.value.name as string)

const vtuberColor = computed(() => {
  const key = currentRouteName.value
  if (key && key in VTUBERS) {
    const v = VTUBERS[key as keyof typeof VTUBERS]
    return 'color' in v ? (v as any).color as string : null
  }
  return null
})

watch(vtuberColor, (c) => {
  if (!c) return
  document.documentElement.style.setProperty('--netease-accent', c)
  const r = parseInt(c.slice(1,3), 16)
  const g = parseInt(c.slice(3,5), 16)
  const b = parseInt(c.slice(5,7), 16)
  document.documentElement.style.setProperty('--netease-accent-rgb', `${r},${g},${b}`)
}, { immediate: true })

const collapsed = ref(true)
function toggle() { collapsed.value = !collapsed.value }

const modalInitStore = useModalInitStore()
const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);
</script>

<template>
  <nav v-if="isMenuRoute" class="app-nav my-3">
    <div class="d-flex justify-content-between align-items-center">
      <button class="btn btn-sm d-sm-none" @click="toggle">
        <span v-if="collapsed">☰</span>
        <span v-else>✕</span>
      </button>
      <div class="d-none d-sm-flex flex-wrap">
        <router-link v-for="r in menuRoutes" :key="r.path" :to="r.path"
          class="nav-link-item text-decoration-none"
          :class="r.name === currentRouteName ? 'active' : ''"
          :style="r.name === currentRouteName && vtuberColor ? { borderImage: `linear-gradient(90deg, ${vtuberColor}, transparent) 1` } : {}">
          {{ r.meta.title }}
        </router-link>
      </div>
      <div class="d-flex align-items-center my-gap-1 flex-shrink-0">
        <button class="btn btn-sm" data-bs-target="#staticBackdrop" data-bs-toggle="modal"
                @click="modalInitStore.triggerSongInfoInit()">
          <i class="iconfont icon-gequliebiao me-1"></i><span class="d-none d-sm-inline">曲リスト</span>
        </button>
        <div class="dropdown">
          <button class="btn btn-sm position-relative" data-bs-toggle="dropdown" :title="isLoggedIn ? 'オンライン' : 'オフライン'">
            <i class="iconfont icon-gongnengkaiguan"></i>
            <span class="nav-dot position-absolute top-0 end-0 rounded-circle"
                  :class="isLoggedIn ? 'bg-success' : 'bg-secondary'"></span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <UserInfo />
            <li><button class="dropdown-item" @click="replaceQueryParam(router, route, 'filter', 'favorite')">お気に入りの曲</button></li>
            <li class="dropdown-item cursor-pointer" data-bs-toggle="modal" data-bs-target="#exampleModal2" @click="modalInitStore.triggerStatsInit()">歌唱統計</li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="https://github.com/hanon-uta/hanon-uta.github.io/blob/main/README.md" target="_blank" rel="noopener noreferrer">このサイドについて</a></li>
          </ul>
        </div>
      </div>
    </div>
    <Transition name="slide">
      <div v-if="!collapsed" class="d-sm-none pt-2 text-center">
        <router-link v-for="r in menuRoutes" :key="r.path" :to="r.path"
          class="nav-link-item d-block py-1 text-decoration-none"
          :class="r.name === currentRouteName ? 'active' : ''"
          :style="r.name === currentRouteName && vtuberColor ? { borderImage: `linear-gradient(90deg, ${vtuberColor}, transparent) 1` } : {}"
          @click="collapsed = true">
          {{ r.meta.title }}
        </router-link>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.app-nav { border-bottom: 1px solid var(--bs-border-color); padding: 0 0 6px 0; }
.nav-link-item {
  color: var(--bs-secondary-color);
  font-size: .92rem;
  padding: 4px 0;
  margin-right: 20px;
  border-bottom: 2px solid transparent;
  transition: color .12s, border-color .12s;
}
.nav-link-item:hover { color: var(--bs-body-color); }
.nav-link-item.active {
  color: var(--bs-body-color);
  border-bottom: 2px solid;
  border-image-slice: 1;
}
@media (max-width: 575px) {
  .nav-link-item { margin-right: 0; }
  .nav-link-item.active { border-bottom-color: transparent; font-weight: 600; }
}

.slide-enter-active { transition: opacity .15s ease; }
.slide-enter-from { opacity: 0; }
.nav-dot { width: 6px; height: 6px; }
</style>
