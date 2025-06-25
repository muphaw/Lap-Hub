<script setup lang="ts">
import SideBarNav from "@/pages/side/SideBarNav.vue"
</script>

<template>
  <div class="flex h-screen">
    <SideBarNav />
    <main class="flex-1 p-6 overflow-auto bg-grey-blue">
      <router-view />
    </main>
  </div>
</template>
