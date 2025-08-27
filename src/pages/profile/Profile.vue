<script setup lang="ts">
import ProjectCard from "@/components/ProjectCard.vue";
import { fetchProject } from "@/service/projectService";
import { useAuthStore } from "@/store/useAuthStore";
import { Project } from "@/types/projects";
import { computed, onMounted, ref } from "vue";

const authStore = useAuthStore(); 
const allProjects = ref<Project[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const projects = computed(() => {
  if (!authStore.user || !authStore.user.user_id) return [];
  const userId = authStore.user.user_id;
  const filtered = allProjects.value.filter(project => {
    return project.user_id === userId;
  });
  return filtered;
});

onMounted(async () => {
   console.log("Fetching projects...")
  try {
    const response = await fetchProject()
    allProjects.value = response
    console.log("response of user projects : ",response)
  } catch (error) {
    console.error('Failed to fetch projects:', error)
  }finally{
    loading.value = false;
  }
});
</script>


<template>
  
  <div class="min-h-screen bg-[#9ec2cf] p-4 pt-20 md:pt-4">
    <div class="">
    <div v-if="loading" class="text-center text-lg">Loading...</div>
    <div v-else-if="error" class="text-center text-red-600 font-semibold">{{ error }}</div>
    <div v-else-if="authStore.user">
      <div class="bg-orange-200 p-5 rounded shadow-[4px_4px_0px_black] border-2 border-black w-full mb-10">
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center md:items-center lg:items-start">

  <div class="flex justify-center md:justify-start  ">
    <img
      :src="authStore.user.image || '/default-avatar.png'"
      alt="user"
      class="w-40 h-32 md:w-60 sm:h-52 object-cover rounded border-2 border-black shadow-[4px_4px_0px_black]"
    />
  </div>


  <div class="flex flex-col gap-3  text-left">
    <h2 class="text-xl sm:text-2xl md:text-3xl font-bold">{{ authStore.user.name }}</h2>
    <div class="text-2xl grid grid-cols-[auto_20px_1fr] gap-3 ">
      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">Email</p>
      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">:</p>
      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">{{ authStore.user.email }}</p>

      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">Student ID</p>
      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">:</p>
      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">{{ authStore.user.uni_id }}</p>

      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">Batch</p>
      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">:</p>
      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">{{ authStore.user.batch }}</p>

      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">Major</p>
      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">:</p>
      <p class="font-medium text-base sm:text-lg md:text-xl lg:text-2xl">{{ authStore.user.major }}</p>
    </div>
  </div>
</div>

      </div>
      <div class="">
        <h2 class="text-3xl font-bold mb-4">Projects</h2>
      <div v-if="projects.length === 0" class="text-gray-700 text-center text-xl">No projects found.</div>
      <div class="grid w-full grid-cols-1  md:grid-cols-1 lg:grid-cols-2   gap-8">
        <ProjectCard
          v-for="project in projects"
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

