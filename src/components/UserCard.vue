<script setup lang="ts">
defineProps<{
  name?: string
  major?: string
  batch?: string
  image?: string
}>()
</script>

<template>
  <div class="flex p-4 transition-all duration-200 ease-in-out hover:translate-y-[-4px] active:shadow-none active:translate-y-[2px] cursor-pointer bg-[#FFF3DE] hover:bg-[#FFF6E6] active:bg-[#FFECCB] border-2 border-black rounded shadow-[4px_4px_0px_black]  ">
      <div class="">
          <img
          :src="image"
          :alt="name"
          class="w-24 h-24 object-cover rounded border-2 border-black mr-4"
        />
      </div>
      <div class="flex flex-col justify-center gap-2">
    <h3 class="text-2xl md:text-xl font-bold">{{ name }}</h3>
    <p class="text-md">{{ major }}</p>
    <p class="text-md">{{ batch }}</p>
  </div>
  </div>

</template>


