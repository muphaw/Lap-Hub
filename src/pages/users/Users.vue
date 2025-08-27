<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
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
import UserCard from '@/components/UserCard.vue';
import {fetchUsers, searchUsers} from '@/service/userService';
import {User} from '@/types/users';
import {computed} from 'vue';

const batches = ref(["2020", "2021", "2022", "2023"])
const majors = ref([
  "Computer Studies",
  "English",
  "Business",
  "Social Studies",
  "Music",
  "Religion"
])

const selectedBatch = ref('')
const selectedMajor = ref('')
const searchQuery = ref('')
const searchResults = ref<User[]>([])
const users = ref<User[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  loading.value = true
  try {
    users.value = await fetchUsers()
  } catch (err: any) {
    console.error(err)
    error.value = err.message || 'Failed to fetch users'
  } finally {
    loading.value = false
  }
})

watch(searchQuery, async (newQuery) => {
  if (!newQuery.trim()) {
    searchResults.value = []
    loading.value = false
    return
  }

  loading.value = true
  try {
    const results = await searchUsers(newQuery)
    searchResults.value = results 
  } catch (err) {
    console.error("Search error:", err)
    searchResults.value = []
  } finally {
    loading.value = false
  }
})

const filteredUsers = computed(() => {
  const list = searchQuery.value.trim() ? searchResults.value : users.value;

  if (!searchQuery.value && !selectedBatch.value && !selectedMajor.value) {
    return list;
  }

  return list.filter(user => {
    const matchesSearch = searchQuery.value
      ? (user.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
         user.email?.toLowerCase().includes(searchQuery.value.toLowerCase()))
      : false;

    const matchesBatch = selectedBatch.value
      ? user.batch === selectedBatch.value
      : false;

    const matchesMajor = selectedMajor.value
      ? user.major === selectedMajor.value
      : false;

    return matchesSearch || matchesBatch || matchesMajor;
  });
});


</script>

<template>
  <div class="min-h-screen bg-[#9ec2cf] p-6 pt-20 md:pt-6">

    <div class="mb-8">
      <div class="flex flex-col lg:flex-row gap-4">

         <div class="relative w-full lg:w-1/2">
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
         <div class="relative w-full lg:w-1/2">
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

<div v-else class="grid w-full grid-cols-1  md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-4">
  <div
    v-for="user in filteredUsers"
    :key="user.user_id"
  >
     <router-link :to="`/users/${user.user_id}`">
      <UserCard
        :name="user.name || 'Unknown'"
        :major="user.major || 'N/A'"
        :batch="user.batch || 'N/A'"
        :image="user.image || '/default-avatar.png'"
      />
    </router-link>
  </div>
</div>

<div
v-if="!loading && filteredUsers.length === 0"
  class="text-center py-10 text-gray-500"
>
  No Users Found.
</div>

  </div>
</template>
