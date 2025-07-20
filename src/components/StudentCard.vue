<!-- src/components/StudentCard.vue -->
<template>
  <div
    class="flex flex-col sm:flex-row bg-[#FFF3DE] border-2 border-black rounded shadow-[4px_4px_0px_black] 
           p-4 gap-4 h-auto sm:h-48 transition-all duration-200 ease-in-out 
           hover:-translate-y-1 active:shadow-none active:translate-y-1 cursor-pointer"
  >
    <!-- Image -->
    <img
      :src="image"
      :alt="name"
      class="w-full sm:w-40 h-40 sm:h-full object-cover rounded border-2 border-black"
    />

    <!-- Info -->
    <div class="flex flex-col justify-center gap-2 sm:gap-5 text-center sm:text-left">
      <h3 class="text-xl sm:text-2xl font-bold">{{ name }}</h3>
      <p class="text-base sm:text-xl">{{ major }}</p>
      <p class="text-base sm:text-xl">{{ year }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  major: string
  year: number
  image: string
}>()
</script>
