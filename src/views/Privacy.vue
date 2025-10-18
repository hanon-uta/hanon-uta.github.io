<script setup lang="ts">
import { useSpecificPage } from "@/composables/useSpecificPage.ts";

useSpecificPage();

const baseUrl = import.meta.env.BASE_URL; // get the base path
</script>

<template>
  <div class="my-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a :href="baseUrl">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Privacy</li>
      </ol>
    </nav>
    <h2 class="h1 text-center mb-5">Privacy Policy</h2>
    <p>Last updated: October 5, 2025</p>

    <p>This website "Hanon Uta"（香鳴ハノン歌枠検索 - 非公式）uses Google OAuth to allow users to sign in with their Google account. We only request minimal permissions ("Drive AppData" and "Profile") to store user favorites privately on your own Google Drive AppData folder. No data is ever shared with any third party or stored on external servers.</p>

    <p>We do not collect, store, or sell personal information. All authentication and data storage occur on Google's secure infrastructure under your control.</p>

    <p>You may revoke access at any time from your Google account settings:
      <a href="https://myaccount.google.com/permissions" target="_blank" class="text-break" >https://myaccount.google.com/permissions</a>.</p>

    <p>For any questions, please contact the developer at <a href="mailto:dtkviolin@gmail.com">dtkviolin@gmail.com</a>.</p>
  </div>
</template>

<style>
.container { max-width: 768px; }
</style>