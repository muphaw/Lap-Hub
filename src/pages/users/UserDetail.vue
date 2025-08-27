<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Button } from '@/components/ui/button';

import { fetchUserById } from '@/service/userService';
import { fetchProject } from '@/service/projectService';
import { Project } from '@/types/projects';
import ProjectCard from '@/components/ProjectCard.vue';

const route = useRoute();
const router = useRouter();

const user = ref<any>(null);
const allProjects = ref<Project[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  loading.value = true;
  error.value = null;

  const userId = Number(route.params.id);
  try {
    const [projectsResponse, userResponse] = await Promise.all([
      fetchProject(),
      fetchUserById(userId)
    ]);
    allProjects.value = projectsResponse;
    user.value = userResponse;
  } catch (err: any) {
    console.error(err);
    error.value = err.message || 'Failed to load data';
  } finally {
    loading.value = false;
  }
});

const userProjects = computed(() => {
  if (!user.value) return [];
  const id = user.value.user_id ?? user.value.id;
  console.log('Filtering projects for user ID:', id);
  const filtered = allProjects.value.filter(project => project.user_id === id);
  console.log('Filtered projects:', filtered);
  return filtered;
});
</script>


<template>
  <div class="min-h-screen bg-[#9ec2cf] p-4 pt-20 md:pt-4">
    <div class="">
      <Button @click="router.go(-1)" class="mb-4 px-3 py-1 shadow-[4px_4px_0px_black] text-black bg-crimson border-2 border-black active:shadow-[0px_0px_0px_black]">
      <img src="/pixel--arrow-left.svg" class="w-4" />
    </Button>
    <div v-if="loading" class="text-center text-lg">Loading...</div>
    <div v-else-if="error" class="text-center text-red-600 font-semibold">{{ error }}</div>
    <div v-else-if="user">
      <div class="bg-orange-200 p-5 rounded shadow-[4px_4px_0px_black] border-2 border-black w-full mb-10">
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center md:items-center lg:items-start">
  <div class="flex justify-center md:justify-start  ">
    <img
      :src="user.image || '/default-avatar.png'"
      alt="user"
      class="w-40 h-32 md:w-60 sm:h-52 object-cover rounded border-2 border-black shadow-[4px_4px_0px_black]"
    />
  </div>

  <div class="flex flex-col gap-3  text-left">
    <h2 class="text-xl sm:text-2xl md:text-3xl font-bold">{{ user.name }}</h2>
    <div class="text-2xl grid grid-cols-[auto_20px_1fr] gap-3 ">
      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">Email</p>
      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">:</p>
      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">{{ user.email }}</p>

      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">Student ID</p>
      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">:</p>
      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">{{ user.uni_id }}</p>

      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">Batch</p>
      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">:</p>
      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">{{ user.batch }}</p>

      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">Major</p>
      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">:</p>
      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">{{ user.major }}</p>
    </div>
  </div>
</div>

      </div>
      <div class="">
        <h2 class="text-3xl font-bold mb-4">Projects</h2>
      <div v-if="userProjects.length === 0" class="text-gray-700 text-center text-xl">No projects found.</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-8">
        <ProjectCard
          v-for="project in userProjects"
          :key="project.project_id"
          :project="project"
        />
      </div>
      </div>
    </div>

    <div v-else>Please log in.</div>
    </div>
  </div>
</template>

