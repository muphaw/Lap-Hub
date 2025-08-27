<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { deleteOneProject, fetchProjectById } from "@/service/projectService";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/store/useAuthStore";
import {User} from "lucide-vue-next";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const project = ref<any | null | undefined>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const owner = computed(() => {
  if (!project.value || !project.value.users) return null;
  return project.value.users.find(
    (user: any) =>
      user.user_id === project.value?.user_id && user.pivot.role === "Owner"
  );
});

const collaborators = computed(() => {
  if (!project.value || !project.value.users) return [];
  return project.value.users.filter(
    (user: any) => user.user_id !== project.value?.user_id
  );
});

onMounted(async () => {
  try {
    const projectId = Number(route.params.id);
    if (isNaN(projectId)) throw new Error("Invalid project ID");
    project.value = await fetchProjectById(projectId);
    console.log(owner.value);
  } catch (err: any) {
    error.value = err.message || "Failed to load project";
  } finally {
    loading.value = false;
  }
});

const handleDelete = async (id: number) => {
  try {
    await deleteOneProject(id);
    router.push({ name: "Home" });
  } catch (error) {
    console.log("error", error);
  }
};

const toggleLike = () => {
  project.value.liked = !project.value.liked;
};

const openProjectLink = () => {
  if (project.value.project_link) {
    (window as Window).open(project.value.project_link, "_blank");
  }
};
</script>

<template>
  <div v-if="loading" class="p-4  max-w-8xl mx-auto text-center">
    Loading project...
  </div>

  <div v-else-if="error" class="p-4 max-w-8xl mx-auto text-center text-red-600">
    {{ error }}
  </div>

  <div v-else-if="project" class="px-6 py-4 pt-20 md:pt-4  space-y-4">
    <div class="flex justify-between">
      <Button
        @click="router.go(-1)"
        class="mb-4 px-3 py-1 shadow-[4px_4px_0px_black] text-black bg-crimson border border-2 border-black active:shadow-[0px_0px_0px_black]"
      >
        <img src="/pixel--arrow-left.svg" class="w-4" />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger as-child>
          <Button
            v-if="authStore.user && authStore.user.user_id === project.user_id"
            class="mb-4 px-3 py-1 shadow-[4px_4px_0px_black] text-black bg-red-400 hover:bg-red-500 active:bg-red-300 border border-2 border-black active:shadow-[0px_0px_0px_black]"
          >
            <img src="/pixel--trash-alt.svg" class="w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent class="border border-2 border-black bg-red-100">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription class="text-gray-700 text-base">
              This action cannot be undone. This will permanently delete your
              project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel class="border border-gray-300 border-2"
              >Cancel</AlertDialogCancel
            >
            <AlertDialogAction
              class="bg-red-700 hover:bg-red-600 active:bg-red-800 border border-black border-2 text-black"
              @click.stop="() => handleDelete(project.project_id)"
              >Continue</AlertDialogAction
            >
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    <div class="">
      <div
        v-if="project.project_images && project.project_images.length"
        class="grid grid-cols-2 gap-5 mb-1"
      >
        <div
          v-for="(photo, index) in project.project_images.slice(0, 2)"
          :key="'top-' + index"
          class="h-40 rounded-lg overflow-hidden border-2 border-black bg-gray-100"
        >
          <img
            :src="photo"
            :alt="`${project.project_name} screenshot ${index + 1}`"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
      <div
        v-if="project.project_images && project.project_images.length"
        class="grid grid-cols-3 gap-5 mb-4"
      >
        <div
          v-for="(photo, index) in project.project_images.slice(2, 5)"
          :key="'bottom-' + index"
          class="h-40 rounded-lg overflow-hidden border-2 border-black bg-gray-100"
        >
          <img
            :src="photo"
            :alt="`${project.project_name} screenshot ${index + 3}`"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
      <div
        v-else
        class="h-40 rounded-lg overflow-hidden border-2 border-black bg-gray-100 mb-4"
      >
        <img
          :src="project.project_images[0]"
          :alt="project.project_name"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <div class="flex items-center gap-3 mb-2">
      <div
        class="w-11 h-11 rounded-full overflow-hidden border-2 border-black bg-gray-200 cursor-pointer"
      >
        <img
          :src="owner?.students?.image || 'https://via.placeholder.com/48'"
          :alt="owner?.students?.name || 'User avatar'"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="cursor-pointer">
        <h2 class="text-xl font-bold hover:underline">
          {{ owner?.students?.name || "unknown" }}
        </h2>
        <p class="text-md">
          {{ owner?.students?.major }} • Class of {{ owner?.students?.batch }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1  lg:grid-cols-9 gap-3">
      <div
        class="col-span-7 lg:col-span-6  bg-[#FFF3DE] rounded-lg p-4 shadow-[4px_4px_0px_black] border-2 border-black"
      >
        <h1 class="text-2xl font-bold mb-2">{{ project.project_name }}</h1>
        <p class="text-lg leading-relaxed">{{ project.project_detail }}</p>
      </div>

      <div class="flex flex-col col-span-2 lg:col-span-3 gap-4">
        <Button
          class="bg-orange-200 hover:bg-orange-100 active:bg-orange-300 py-6 text-lg border-2 border-black flex items-center gap-5 rounded text-black cursor-pointer transition-all duration-200 shadow-[4px_4px_0px_black]"
        >
          <img
            src="/calendar-days-svgrepo-com.svg"
            alt="Calendar"
            class="w-5 h-6"
          />
          <div class="text-left">
            <div class="text-lg font-bold leading-tight">Project Date</div>
            <div class="text-md leading-tight">
              {{ formatDate(project.created_at) }}
            </div>
          </div>
        </Button>

        <Button
          v-if="project"
          @click.stop="toggleLike"
          :class="[
            'py-6 pr-16 text-lg border-2 border-black flex items-center gap-5 rounded cursor-pointer transition-all duration-200 shadow-[4px_4px_0px_black]',
            project.liked
              ? 'bg-red-200 hover:bg-red-100 active:bg-red-300 text-red-700'
              : 'bg-red-200 hover:bg-red-100 active:bg-red-300 text-black',
          ]"
        >
          <img src="/share-04-svgrepo-com (4).svg" class="w-5 h-4" />
          <span class="text-xl">
            {{ project.liked ? "Liked" : "Like" }}
          </span>
        </Button>

        <Button
          :disabled="!project.project_link"
          @click.stop="openProjectLink"
          :class="[
            'py-6 pr-5 text-lg border-2 border-black flex items-center gap-5 rounded transition-all duration-200 shadow-[4px_4px_0px_black]',
            project.project_link
              ? 'bg-green-200 hover:bg-green-100 active:bg-green-300 text-black cursor-pointer'
              : 'bg-green-200 opacity-50 text-black cursor-not-allowed',
          ]"
        >
          <img src="/share-04-svgrepo-com (4).svg" class="w-5 h-4" />
          <span class="text-xl">Live Demo</span>
        </Button>
      </div>
    </div>

    <div class="collaborators-section">
      <div class="flex items-center gap-3 mb-3">
        <div
          class="w-10 h-10 bg-sidebar border border-black border-2 flex items-center justify-center rounded-full"
        >
          <User color="#000000" class="w-8 h-8  rounded-full" />
        </div>
        <h3 class="text-xl font-bold">Collaborators</h3>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-3">
        <div
          v-for="member in collaborators.slice(0, 3)"
          :key="member.user_id"
          class="bg-[#7885C5] hover:bg-[#909EE2] active:bg-[#6477D6] rounded-lg p-1 shadow-[4px_4px_0px_black] border-2 border-black hover:shadow-[6px_6px_0px_black] transition-all duration-200"
        >
          <div class="flex  items-center gap-8 sm:gap-4 md:gap- lg:gap-8 pl-8 sm:gap-4 md:pl-6 lg:pl-8 cursor-pointer ">
            <div
              class="w-11 h-11 rounded-full overflow-hidden border-2 border-black bg-gray-200"
            >
              <img
                :src="
                  member.students?.image || 'https://via.placeholder.com/32'
                "
                :alt="member.students?.name || 'User avatar'"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="flex flex-col">
              <h4 class="text-xl font-bold">
                {{ member.students?.name || "User avatar" }}
              </h4>
              <p class="text-md text-black">
                {{ member.students?.major || "Unknown" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="p-4 max-w-6xl mx-auto text-center">Project not found</div>
</template>
