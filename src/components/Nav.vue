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

const modalInitStore = useModalInitStore()
const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);

const collapsed = ref(true)
</script>

<template>
  <nav v-if="isMenuRoute" class="app-nav navbar navbar-expand-sm py-2 mb-3">
    <div class="container-fluid px-0">
      <!-- Mobile header row: toggler + actions -->
      <div class="d-flex d-sm-none w-100 align-items-center">
        <button class="navbar-toggler border-0 px-0 me-2 toggler-clean" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarContent" aria-controls="navbarContent"
                aria-expanded="false" aria-label="ナビゲーション"
                :class="collapsed ? '' : 'btn btn-close'"
                @click="collapsed = !collapsed">
          <span v-if="collapsed" class="navbar-toggler-icon"></span>
        </button>
        <div class="nav-actions d-flex align-items-center gap-1">
          <button class="btn btn-sm" data-bs-target="#staticBackdrop" data-bs-toggle="modal"
                  @click="modalInitStore.triggerSongInfoInit()">
            <i class="iconfont icon-gequliebiao me-1"></i><span class="d-none d-sm-inline">曲リスト</span>
          </button>
          <div class="dropdown">
            <button class="btn btn-sm position-relative" data-bs-toggle="dropdown"
                    :title="isLoggedIn ? 'オンライン' : 'オフライン'">
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

      <!-- Desktop tabs + Mobile collapse -->
      <div class="collapse navbar-collapse" id="navbarContent">
        <div class="navbar-nav mobile-center">
          <router-link v-for="r in menuRoutes" :key="r.path" :to="r.path"
            class="nav-link"
            :class="{ active: r.name === currentRouteName }"
            :style="r.name === currentRouteName && vtuberColor
              ? { borderImage: `linear-gradient(90deg, ${vtuberColor}, transparent) 1` } : {}">
            {{ r.meta.title }}
          </router-link>
        </div>
      </div>

      <!-- Desktop actions -->
      <div class="nav-actions d-none d-sm-flex align-items-center gap-1">
        <button class="btn btn-sm" data-bs-target="#staticBackdrop" data-bs-toggle="modal"
                @click="modalInitStore.triggerSongInfoInit()">
          <i class="iconfont icon-gequliebiao me-1"></i><span>曲リスト</span>
        </button>
        <div class="dropdown">
          <button class="btn btn-sm position-relative" data-bs-toggle="dropdown"
                  :title="isLoggedIn ? 'オンライン' : 'オフライン'">
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
  </nav>
</template>

<style scoped>
.app-nav { border-bottom: 1px solid var(--bs-border-color); }
.nav-link {
  color: var(--bs-secondary-color);
  font-size: .92rem;
  padding: 4px 0;
  padding-left: 0 !important;
  margin-top: 2px;
  margin-right: 10px;
  border-bottom: 2px solid transparent;
  transition: color .12s, border-color .12s;
}
.nav-link:hover { color: var(--bs-body-color); }
.nav-link.active {
  color: var(--bs-body-color);
  border-bottom: 2px solid;
  border-image-slice: 1;
}
.nav-dot { width: 6px; height: 6px; }
.navbar-toggler.btn-close {
  font-size: 0.95rem;
  margin-left: 2px;
}
.navbar-toggler-icon { width: 1.1em; height: 1.1em; }
.nav-actions { margin-left: auto; }

.toggler-clean { box-shadow: none !important; }
.toggler-clean:focus { box-shadow: none !important; }

@media (max-width: 575px) {
  .mobile-center { text-align: center; }
  .mobile-center .nav-link { margin-right: 0;}
  .nav-link.active { border-bottom-color: transparent; font-weight: 600; }
}
</style>
