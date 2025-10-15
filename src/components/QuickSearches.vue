<script setup lang="ts">
const quickSearches = [
  { text: "RouteHeart", query: "RouteHeart" },
  { text: "アイドル 歌ってみた", query: "アイドル" },
  { text: "世界一可愛い私 香鳴ハノン", query: "世界一可愛い私" },
  // You can keep adding more
];

const baseUrl = import.meta.env.BASE_URL; // get the base path
</script>
<template>
  <footer class="mb-4">
    <p>
      <span class="d-flex flex-wrap my-gap-2">
      <span>クイック検索:</span>
      <template v-for="(item, idx) in quickSearches" :key="item.query">
        <a
          :href="`${baseUrl}?search=${encodeURIComponent(item.query)}`"

        >
          {{ item.text }}
        </a>
        <span class="text-secondary" v-if="idx != quickSearches.length - 1">|</span>
      </template>
      </span>
    </p>

    <p>
      <span class="d-flex flex-wrap my-gap-2 small">
        <span>&copy; 2025 Hanon Uta</span>
      <a href="/terms.html" target="_blank">Terms of Service</a>
      <span>·</span>
      <a href="/privacy.html" target="_blank">Privacy Policy</a>
      </span>
    </p>
  </footer>
</template>

<style scoped>

</style>