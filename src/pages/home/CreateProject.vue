<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'
import SelectGroup from '@/components/ui/select/SelectGroup.vue'
import { onMounted, ref } from 'vue'
import ImageUploader from '@/components/ImageUploader.vue'
import {FormData, handleProject} from '@/service/projectService'
import {User} from '@/types/users'
import {fetchUsers} from '@/service/userService'
import {useAuthStore} from '@/store/useAuthStore'
import Calendar from '@/components/Calendar.vue'


const projectImages = ref<File[]>([])
const router = useRouter()

const title = ref('')
const description = ref('')
const projectLink = ref('')
const projectDate = ref('')
const { user } = useAuthStore()

declare const URL: typeof window.URL

const allUsers = ref<User[]>([])

onMounted(async () => {
  try {
    const response = await fetchUsers()
    allUsers.value = response.filter(u => u.user_id !== user?.user_id)
  } catch (error) {
    console.error('Failed to fetch users', error)
  }
})

function mapSelectedUsersToCollaborators(selected: string[]): { user_id: number }[] {
  return selected.map(name => {
    const user = allUsers.value.find(u => u.name === name)
    if (!user) throw new Error(`User not found: ${name}`)
    return { user_id: user.user_id }
  })
}

function toggleUserName(userName: string | undefined) {
  if (!userName) return
  const index = selectedUsers.value.indexOf(userName)
  if (index > -1) {
    selectedUsers.value.splice(index, 1)
  } else {
    selectedUsers.value.push(userName)
  }
}


const handleSubmit = async () => {
  try {
     if (!user?.user_id) {
      alert('You must be logged in to create a project.')
      return
    }
    const collaboratorsPayload = mapSelectedUsersToCollaborators(selectedUsers.value)

    const formData: FormData = {
      title: title.value,
      description: description.value,
      images: projectImages.value,
      date: projectDate.value || '',
      link: projectLink.value || '',
      collaborators: collaboratorsPayload
    }

    await handleProject(formData,user.user_id)
    console.log("P : ",formData)
    router.push('/projects')
  } catch (error) {
    alert('Failed to create project')
    console.error(error)
  }
}


function goBack() {
  router.back()
}

const selectedUsers = ref<string[]>([])

</script>

<template>
  <div class="py-6 px-4 md:px-16 min-h-screen bg-sidebar">
    <Button @click="goBack" class="mb-4 px-3 py-1 shadow-[4px_4px_0px_black] text-black bg-crimson border border-2 border-black active:shadow-[0px_0px_0px_black]">
      <img src="/pixel--arrow-left.svg" class="w-4" />
    </Button>

    <h2 class="text-4xl text-center font-medium mb-6">Create Project</h2>

    <Form @submit="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <FormField name="'title'">
            <FormItem>
              <FormLabel class="text-xl">Project Title</FormLabel>
              <FormControl>
                <Input v-model="title" placeholder="Enter project title" class="shadow-[4px_4px_0px_black] text-base bg-input border border-2 border-black" required />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField name="collaborators">
            <FormItem>
              <FormLabel class="text-xl">Collaborators</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger class="w-full shadow-[4px_4px_0px_black] bg-input !text-black text-base border border-2 border-black">
                    {{ selectedUsers.length ? selectedUsers.join(", ") : "Select users" }}
                  </SelectTrigger>
                  <SelectContent class="w-full shadow-[4px_4px_0px_black] text-black bg-input border border-2 border-black">
                    <SelectGroup>
                      <SelectItem
                        v-for="user in allUsers"
                        :key="user.user_id"
                        :value="user"
                         @click="toggleUserName(user.name)"
                        >
                        <span class="flex items-center justify-between w-full">
                          {{ user.name }}
                        </span>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField name="link">
            <FormItem>
              <FormLabel class="text-xl">Project Link</FormLabel>
              <FormControl>
                <Input v-model="projectLink" type="url" placeholder="https://..." class="shadow-[4px_4px_0px_black] text-base bg-input border border-2 border-black" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField name="description">
            <FormItem>
              <FormLabel class="text-xl">Project Description</FormLabel>
              <FormControl>
                <Textarea v-model="description" placeholder="Write a description..." rows="6" class="shadow-[4px_4px_0px_black] text-base bg-input border border-2 border-black" required />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <div class="space-y-4">

        <FormField name="date">
            <FormItem>
              <FormControl>
                 <Calendar />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          

          <FormField name="images">
            <FormItem>
              <FormLabel class="text-xl">Project Images</FormLabel>
              <ImageUploader v-model="projectImages" :max-images="5" />
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </div>

      <div class="flex justify-center pt-10">
        <Button
          type="submit"
          class="px-12 sm:px-24 md:px-32 lg:px-48 py-3 text-lg md:text-xl shadow-[4px_4px_0px_black] text-black bg-dark-yellow border-2 border-black active:shadow-[0px_0px_0px_black]"
        >
          Create
        </Button>
      </div>
    </Form>
  </div>
</template>
