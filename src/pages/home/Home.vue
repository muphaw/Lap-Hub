<script setup lang="ts">
import { ref,  onMounted, computed, watch } from "vue";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-vue-next";
import {Project} from "@/types/projects";
import {fetchProject, searchProjects} from "@/service/projectService";
import ProjectCard from "@/components/ProjectCard.vue";


const batches = ref(["2020", "2021", "2022", "2023"])
const majors = ref([
  "Computer Studies",
  "English",
  "Business",
  "Social Studies",
  "Music",
  "Religion"
])

const searchQuery = ref('')
const searchResults = ref<Project[]>([])


const projects = ref<Project[]>([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    projects.value = await fetchProject();
    console.log("projects",projects.value)
  } catch (err) {
  } finally {
    loading.value = false;
  }
});

watch(searchQuery, async (newQuery) => {
  if (!newQuery.trim()) {
    searchResults.value = [];
    loading.value = false;
    return;
  }
  
  loading.value = true;
  try {
    const results = await searchProjects(newQuery);
    searchResults.value = results.projects.map((project: any) => ({
      ...project,
      users: project.users || [],
    }));
  } catch (err) {
    searchResults.value = [];
  } finally {
    loading.value = false;
  }
});


const filteredProjects = computed(() => {
  const list = searchQuery.value.trim()
    ? searchResults.value
    : projects.value;

  if (!searchQuery.value && !selectedBatch.value && !selectedMajor.value) {
    return list;
  }

  return list.filter((project) => {
    const users = (project as any).users || [];

    const searchMatch = searchQuery.value
      ? project.project_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        project.project_detail.toLowerCase().includes(searchQuery.value.toLowerCase())
      : false;

    const batchMatch = selectedBatch.value
      ? users.some((user : any) => user.students?.batch === selectedBatch.value)
      : false;

    const majorMatch = selectedMajor.value
      ? users.some((user : any) => user.students?.major === selectedMajor.value)
      : false;
    return searchMatch || batchMatch || majorMatch;
  });
});

const selectedBatch = ref("");
const selectedMajor = ref("");

</script>

<template>
  <div class="p-6 pt-20 md:pt-6 sm  bg-grey-blue">
    <div class="mb-8">
      <div class="flex flex-col lg:flex-row gap-4">
         <div class="relative  w-full lg:w-1/2">
          <Select v-model="selectedBatch">
            <SelectTrigger
              class="bg-dark-yellow shadow-[4px_4px_0px_black] !text-black border-black border-2 pl-8 text-lg pr-8"
            >
              <SelectValue placeholder="Batch" class="text-black" />
            </SelectTrigger>
            <SelectContent class="bg-dark-yellow border-black border-2">
              <SelectGroup>
                <SelectLabel>Batch</SelectLabel>
                <SelectItem
                  v-for="batch in batches"
                  :key="batch"
                  :value="batch"
                >
                  {{ batch }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div class="relative  w-full lg:w-1/2">
          <Select v-model="selectedMajor">
            <SelectTrigger
              class="bg-dark-yellow shadow-[4px_4px_0px_black] border-black !text-black  border-2 pl-8 text-lg pr-8"
            >
              <SelectValue
                placeholder="Major"
                class="text-black border-black"
              />
            </SelectTrigger>
            <SelectContent class="bg-dark-yellow border-black border-2">
              <SelectGroup>
                <SelectLabel>Major</SelectLabel>
                <SelectItem
                  v-for="major in majors"
                  :key="major"
                  :value="major"
                >
                  {{ major }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="relative w-full">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search"
            class="w-full px-10 h-9 rounded-md text-sm bg-[#FAE7D9] shadow-[4px_4px_0px_black] text-black border border-2 border-black"
          />
          <span class="absolute left-3 top-5 -translate-y-1/2"
            ><Search class="w-5 h-5 pb-1"
          /></span>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center py-4 text-gray-600">
        Loading...
      </div>

<div v-else class="grid w-full grid-cols-1  md:grid-cols-1 lg:grid-cols-2   gap-4">
  <div
    v-for="project in filteredProjects"
    :key="project.project_id"
  >
    <ProjectCard :project="project" />
  </div>
</div>

<div
 v-if="!loading && filteredProjects.length === 0"
  class="text-center py-10 text-gray-500"
>
  No projects found
</div>
  </div>
</template>