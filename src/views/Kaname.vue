<script setup lang="ts">

import { VTUBERS } from "@/config/constants.ts";
import HelloWorld from "@/components/HelloWorld.vue";
</script>

<template>
  <HelloWorld :vtuber="VTUBERS.TOKIWA_KANAME['name']" />
</template>

<style scoped>

</style>