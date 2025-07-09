<script setup lang="ts">
import { ref, onMounted, } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface UserProject {
  id: number
  title: string
  views: number
  imageUrl?: string
}

interface User {
  name: string
  avatar: string
  department: string
  batch: string
  major: string
  projects: UserProject[]
  bio?: string
  skills?: string[]
}

const router = useRouter()
const route = useRoute()
const username = ref<string>(route.params.username as string)
const user = ref<User | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

// Mock data - replace with actual API calls
const mockUsers: Record<string, User> = {
  'jacob-jones': {
    name: 'Jacob Jones',
    avatar: '/wp11948351.webp',
    department: 'Computer Science',
    batch: '2023',
    major: 'Software Engineering',
    bio: 'Passionate full-stack developer with experience in Vue.js and Node.js',
    skills: ['JavaScript', 'Vue.js', 'React', 'Node.js'],
    projects: [
      { id: 1, title: 'E-Commerce Project', views: 120, imageUrl: '/ecommerce.jpg' },
      { id: 2, title: 'Task Management App', views: 85, imageUrl: '/task-app.jpg' }
    ]
  },
  'sarah-miller': {
    name: 'Sarah Miller',
    avatar: '/kim-tae-ri.jpg',
    department: 'Health Informatics',
    batch: '2023',
    major: 'Health Technology',
    bio: 'Health tech specialist focusing on mobile applications for patient care',
    skills: ['React Native', 'Firebase', 'UI/UX Design'],
    projects: [
      { id: 3, title: 'Health Tracker App', views: 95, imageUrl: '/health-app.jpg' },
      { id: 4, title: 'Medication Reminder', views: 64, imageUrl: '/med-reminder.jpg' }
    ]
  }
}

const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const handleImageError = (e: Event, type: 'avatar' | 'project' = 'avatar') => {
  const img = e.target as HTMLImageElement
  const parent = img.parentElement
  
  if (!parent) return
  
  img.style.display = 'none'
  parent.classList.add(
    'flex', 'items-center', 'justify-center',
    'bg-gray-200', 'text-gray-600'
  )
  
  if (type === 'avatar' && user.value) {
    parent.textContent = getInitials(user.value.name)
    parent.classList.add('font-bold', 'text-xl')
  } else {
    parent.innerHTML = `
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    `
  }
}

const viewProject = (projectId: number) => {
  router.push(`/project/${projectId}`)
}

onMounted(() => {
  try {
    // Simulate API call
    setTimeout(() => {
      const foundUser = mockUsers[username.value.toLowerCase().replace(' ', '-')]
      
      if (foundUser) {
        user.value = foundUser
      } else {
        error.value = 'User not found'
        // Optionally redirect to 404
        // router.push('/404')
      }
    }, 300)
  } catch (err) {
    error.value = 'Failed to load user data'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-10">
      Loading user profile...
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-10 text-red-600">
      {{ error }}
    </div>

    <!-- Success State -->
    <template v-else-if="user">
      <!-- User Profile Header -->
      <div class="flex flex-col sm:flex-row items-start gap-6 mb-8">
        <div class="w-24 h-24 rounded-full overflow-hidden border-2 border-black shadow-lg bg-gray-200 flex-shrink-0">
          <img 
            :src="user.avatar" 
            :alt="user.name"
            class="w-full h-full object-cover"
            @error="(e) => handleImageError(e, 'avatar')"
          >
        </div>
        
        <div class="flex-1">
          <h1 class="text-2xl sm:text-3xl font-bold">{{ user.name }}</h1>
          <p class="text-gray-600 mb-2">
            {{ user.department }} • Batch {{ user.batch }}
          </p>
          <p class="text-gray-600 font-medium">{{ user.major }}</p>
          
          <!-- Bio -->
          <p v-if="user.bio" class="mt-3 text-gray-700">
            {{ user.bio }}
          </p>
          
          <!-- Skills -->
          <div v-if="user.skills?.length" class="mt-3 flex flex-wrap gap-2">
            <span 
              v-for="skill in user.skills" 
              :key="skill"
              class="px-3 py-1 bg-gray-100 text-sm rounded-full border border-gray-300"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>

      <!-- Projects Section -->
      <div class="bg-white p-6 rounded-lg shadow-[4px_4px_0px_black] border-2 border-black">
        <h2 class="text-xl font-semibold mb-4">Projects</h2>
        
        <div v-if="user.projects.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            v-for="project in user.projects" 
            :key="project.id"
            @click="viewProject(project.id)"
            class="p-4 border-2 border-black rounded-lg hover:shadow-[4px_4px_0px_black] transition-all cursor-pointer"
          >
            <div class="h-40 mb-3 rounded overflow-hidden bg-gray-100">
              <img 
                v-if="project.imageUrl"
                :src="project.imageUrl" 
                :alt="project.title"
                class="w-full h-full object-cover"
                @error="(e) => handleImageError(e, 'project')"
              >
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
            <h3 class="font-medium text-lg">{{ project.title }}</h3>
            <p class="text-sm text-gray-500">{{ project.views }} views</p>
          </div>
        </div>
        
        <div v-else class="text-center py-6 text-gray-500">
          No projects yet
        </div>
      </div>
    </template>

    <!-- Not Found State -->
    <div v-else class="text-center py-10">
      User not found
    </div>
  </div>
</template>

<style scoped>
/* Custom transitions */
.cursor-pointer {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.cursor-pointer:hover {
  transform: translate(-2px, -2px);
}
</style>