<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue'
import { VTUBERS } from '@/config/constants';
import { characterColors } from "@/utils/songTagUtils.ts";
</script>

<template>
  <h3 :style="{'color': characterColors[VTUBERS.SAOTOME_GABU['name_ja']]}" class="text-center fw-bolder">
    {{ VTUBERS.SAOTOME_GABU['name_ja'] }} さん</h3>
  <h4 class="text-center mt-3 mb-4 fw-bold">
    <a class="text-decoration-none thanks d-inline-block"
       href="https://x.com/saotomegabu/status/2014352100403167625" target="_blank">活動ありがとうございました！</a></h4>
  <HelloWorld :vtuber="VTUBERS.SAOTOME_GABU['name']"/>
</template>

<style lang="scss" scoped>
.thanks {
  transition: .3s;
  color: #c68ef6;
}
.thanks:hover {
  color: #795da3;
}
</style>