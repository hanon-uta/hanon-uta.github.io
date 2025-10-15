<script lang="ts" setup>
import type { Song } from '@/types/song'
import { timestampToDate } from "@/utils/timeUtils.ts";
import { nameColor } from "@/utils/songTagUtils.ts";
import { storeToRefs } from "pinia";
import { useColorModeStore } from "@/stores/color-mode.ts";
import FavoriteIcon from "@/components/FavoriteIcon.vue";
import { replaceQueryParam } from "@/utils/routerUtils.ts";
import { useRoute, useRouter } from "vue-router";
import { useScreenSize } from "@/composables/useScreenSize.ts";

const props = defineProps<{ paginatedSongs: Song[] }>();
const { isDark } = storeToRefs(useColorModeStore())

const router = useRouter();
const route = useRoute();

const { isSmallScreen480, breakPoint } = useScreenSize();

function showVideoList(videoId: string) {
  replaceQueryParam(router, route, 'v', videoId);
  window.scrollTo({ top: 0, behavior: "smooth" })
}

</script>

<template>
  <TransitionGroup tag="section" name="fade-only" mode="out-in"
                   class="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-2 g-2">
    <article v-for="(song, _) in props.paginatedSongs" :key="song.ref_video_url">
      <div class="card h-100 hover-bg-light p-0">
        <div class="card-img-top ratio ratio-16x9 position-relative overflow-hidden">
          <a :href="song.ref_video_url" class="d-flex align-items-center justify-content-center overflow-hidden" target="_blank" rel="noopener noreferrer">
            <img v-lazy="{
                  src: song.ref_video_thumbnail_url,
                  loading: song.ref_video_thumbnail_lqip_url
                }" :alt="song.song_title" :title="song.song_title" loading="lazy" class="img-fluid w-100"/>
          </a>
        </div>

        <div class="card-body position-relative">
          <!-- Song tags -->
          <div v-if="song.tags.length > 0" class="card-tags position-absolute top-0 start-0 flex-wrap flex-wrap-reverse">
            <template v-for="tag in song.tags">
                <span :style="'background-color: ' + nameColor(tag)"
                      class="badge rounded-1 small m-1 opacity-868 overflow-hidden"
                      :class="{ 'tag-badge' : isSmallScreen480 }"
                      v-tooltip="isSmallScreen480 && tag.length > 10 ? `${tag}` : ''">
                    <small>{{ tag }}</small>
                </span>
            </template>
          </div>

          <h2 v-tooltip="song.song_title" class="card-title hover-text-light rounded-1 text-truncate d-flex align-items-center h6 overflow-hidden"
            :class="{ 'small' : breakPoint === 'sm' }">
              <i class="iconfont icon-music" style="margin-right: 1.5px"></i>
              {{ song.song_title }}
          </h2>
          <p class="card-text hover-text-light rounded-1">
            <small v-tooltip="song.song_origin_artist" class="text-muted d-block text-truncate">
              {{song.song_origin_artist }}
            </small>
          </p>
          <div class="dropdown dropup-center card-text hover-text-light rounded-1 mb-2">
            <button class="btn user-select-text text-wrap text-start p-0 dropdown-toggle drop border-0 no-arrow" data-bs-toggle="dropdown"
                    data-bs-offset="0,10" aria-expanded="false" >
              <small class="text-muted card-subtitle multi-line-ellipsis-2">
                {{song.ref_video_title}}
              </small>
            </button>
            <ul class="dropdown-menu p-0">
              <li>
                <h3 :class="{ 'text-light' : isDark }"
                    class="h6 dropdown-header fw-normal text-wrap p-3">
                  {{ song.ref_video_title }}<br />
                <span class="badge d-inline-block mt-3 border text-secondary rounded-1 small"
                      :class=" isDark ? 'bg-dark' : 'bg-light'">
                  <small>{{ timestampToDate(song.ref_video_publish_date_ts) }}</small>
                </span>
                </h3>
              </li>
              <li class="small">
                <button class="btn btn-sm border d-inline-block text-end m-3 mt-0"
                        :class="isDark ? 'btn-dark' : 'btn-light'"
                   @click="showVideoList(song.ref_video_id)" role="button">配信全曲一覧</button>
              </li>
            </ul>
          </div>
          <p class="card-text hover-text-light rounded-1 d-flex align-items-center justify-content-between">
            <small class="text-muted">
              <a :href="song.ref_video_url" :title="song.song_title" class="d-flex align-items-center text-decoration-none text-secondary d-block"
                 target="_blank" rel="noopener noreferrer">
                <i class="iconfont iconfont-sm icon-bofang"></i>
                <span class="ms-1 text-box-auto">{{ song.song_start_time }}</span></a>
            </small>
            <FavoriteIcon :song-id="song.song_id" />
          </p>
        </div>
      </div>
    </article>
  </TransitionGroup>
</template>

<style lang="scss" scoped>
@import "@/scss/song-list.scss";

</style>