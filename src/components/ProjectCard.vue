<script setup lang="ts">
import { computed, ref } from "vue";
import Button from "./ui/button/Button.vue";
import { Icon } from '@iconify/vue'

const props = defineProps<{
  project: any;
}>();


const liked = ref(props.project.liked);
const toggleLike = () => {
  liked.value = !liked.value;
};

const poster = computed(() => {
  if (!props.project.users) return null;
  return props.project.users.find((u: any) => u.pivot.role === "Owner") || null;
});

const collaborators = computed(() => {
  if (!props.project.users) return [];
  return props.project.users.filter((u: any) => u.pivot.role === "Collaborator");
});

const openProjectLink = () => {
  if (props.project.project_link) {
    (window as Window).open(props.project.project_link, '_blank');
  }
};

const getInitials = (name: string) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};
</script>

<template>
  <div
    class="bg-[#FFF3DE] hover:bg-[#FFF6E6] active:bg-[#FFECCB] rounded-lg flex flex-col p-5 gap-3 w-full transition-all duration-200 ease-in-out hover:-translate-y-1 active:shadow-none active:translate-y-0.5 cursor-pointer shadow-[4px_4px_0px_black] text-black text-xl border-2 border-black"
  >
    <div class="flex items-center justify-between w-full">
      <div class="flex items-center space-x-3">
        <div
          class="w-11 h-11 rounded-full border-2 border-black overflow-hidden bg-gray-100 flex items-center justify-center"
        >
          <img
            :src="poster?.students?.image || 'https://via.placeholder.com/48'"
            :alt="poster?.students?.name || 'User avatar'"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="flex flex-col">
          <h3 class="text-xl font-bold text-gray-800 hover:underline">
            {{ poster?.students?.name || "Unknown" }}
          </h3>
          <span class="text-base text-gray-700">
            {{ poster?.students?.major || "Unknown" }}
          </span>
        </div>
      </div>

      <div class="flex items-center">
        <template
          v-for="(member, index) in collaborators.slice(0, 3)"
          :key="member.user_id"
        >
          <div
            class="w-8 h-8 rounded-full border-2 border-black shadow-sm overflow-hidden bg-gray-200 hover:scale-110 -ml-2.5 relative flex items-center justify-center text-xs font-semibold text-gray-600"
            :style="{ zIndex: 3 - index }"
          >
            <img
              :src="member.students?.image || 'https://via.placeholder.com/32'"
              :alt="member.students?.name || 'User avatar'"
              class="w-full h-full object-cover"
            />
            <template v-if="!member.students?.image">
              {{ getInitials(member.students?.name || "") }}
            </template>
          </div>
        </template>

        <div
          v-if="collaborators.length > 3"
          class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600 border-2 border-black shadow-sm -ml-2.5"
        >
          +{{ collaborators.length - 3 }}
        </div>
      </div>
    </div>

    <div :key="project.project_id">
      <router-link :to="{ name: 'ProjectDetail', params: { id: project.project_id } }" class="block">
        <div class="pb-3">
        <div
          class="w-full h-48 overflow-hidden rounded shadow-[4px_4px_0px_black] border-2 border-black"
        >
          <img
            :src="
              project.project_images?.[0] ||
              'https://via.placeholder.com/400x200'
            "
            class="w-full h-full object-cover"
          />
        </div>
      </div>
      <div class="flex-grow">
        <h2 class="text-3xl font-bold text-black">
          {{ project.project_name }}
        </h2>
        <p class="text-base leading-relaxed text-black line-clamp-3">
          {{ project.project_detail }}
        </p>
      </div>
    </router-link>
      
    </div>

    <div class="flex justify-between">
      <Button
        @click.stop="toggleLike"
        :class="[
          ' rounded shadow-[4px_4px_0px_black] text-black text-md border-2 border-black flex items-center gap-2',
          liked ? 'bg-red-600 ' : 'bg-red-300 hover:bg-red-400',
        ]"
      >
        <span :class="liked ? 'text-yellow-400' : 'text-green-500'">
          <template v-if="liked">
        <img src="/pixel--heart-solid (1).svg" class="w-5 h-4 text-green-500" fill="blue" />

          </template>
          <template v-else>
            <img src="/public/pixel--heart.svg" class="w-5 h-4 " />
          </template>
        </span>
      </Button>
      <Button
       :disabled="!props.project.project_link"
          @click.stop="openProjectLink"
          :class="[
            'bg-teal-blue border border-2 border-black flex items-center gap-2 rounded text-md text-black cursor-pointer transition-all duration-200 shadow-[4px_4px_0px_black]',
            !props.project.project_link ? 'opacity-50 cursor-not-allowed' : ''
          ]"
        >
        <img src="/share-04-svgrepo-com (4).svg" class="w-5 h-4" />
        Live
      </Button>
    </div>
  </div>
</template>
