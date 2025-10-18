<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useColorModeStore } from "@/stores/color-mode.ts";
import { useSpecificPage } from "@/composables/useSpecificPage.ts";

const { isDark } = storeToRefs(useColorModeStore())
const baseURL = import.meta.env.BASE_URL;

useSpecificPage();

</script>

<template>
  <div class="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
    <h1 class="display-1 fw-bold mb-3">404</h1>
    <h2 class="h3 mb-3">ページが見つかりません</h2>
    <p class="mb-4 text-muted">
      お探しのページは存在しないか、移動した可能性があります。
    </p>
    <a :href="baseURL" class="btn border" :class="isDark ? 'btn-dark' : 'btn-light'">
      ホームに戻る
    </a>
  </div>
</template>

<style scoped>

</style>