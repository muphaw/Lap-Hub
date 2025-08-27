<script setup lang="ts">
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import {
  Form as VeeForm,
  Field,
  ErrorMessage,
} from 'vee-validate'
import { Button } from '@/components/ui/button'
import * as yup from 'yup'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/store/useAuthStore'
import {computed} from 'vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ref } from 'vue'

interface FormValues {
  email: string
  password: string
}

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password too short').required('Password is required'),
})

const router = useRouter()
const authStore = useAuthStore()
const loading = computed(() => authStore.loading)
const errorMessage = ref<string | null>(null)


const onSubmit = async (values: Record<string, any>) => {
  const formValues = values as FormValues
  try {
    await authStore.login(
      formValues.email,
      formValues.password,
    )
    router.push('/')
  } catch (err: any) {
    if (err.response) {
  if (err.response.status === 422) {
    errorMessage.value = 'User not found. Please register first.'
  } else if (err.response.status === 401) {
    errorMessage.value = 'Incorrect password. Please try again.'
  } else {
    errorMessage.value = 'Login failed. Please try again later.'
  }
} else {
  errorMessage.value = 'Network error. Please check your connection.'
}
  }
}
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen">
    <div
      class="hidden md:flex w-1/2 bg-sidebar text-black flex-col justify-center items-start px-8 border-r-2 border-black"
    >
      <h1 class="text-8xl mb-2 text-[#ffeac5]" style="
                -webkit-text-stroke: 1.5px black;  
                text-shadow: 6px 5px 4px black;">Welcome to LAPHUB</h1>   
      <p class="text-3xl text-black"
      style="-webkit-text-stroke: 0.2px #ffeac5;"
      >Join LAP HUB ---- Share your LAP journey.</p>
      <img
        src="/public/Street Life Class Picture.svg"
        alt="Logo"
        class="mb-4 max-w-full"
      />
    </div>

    <div
      class="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-8 py-8 bg-grey-blue"
    >
      <div class="w-full max-w-xl">
        <div class="block md:hidden mb-6 text-center">
          <h1 class="text-4xl font-bold mb-2">Welcome to LAPHUB</h1>
          <p class="text-base">Join LAP HUB ---- Share your LAP journey.</p>
        </div>

        <Alert v-if="errorMessage" variant="destructive" class="mb-4 bg-red-100">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{{ errorMessage }}</AlertDescription>
        </Alert>
        <h2 class="text-3xl md:text-4xl text-center font-medium mb-6">
          Login
        </h2>
        
        <VeeForm class="space-y-6"  :validation-schema="schema"
          @submit="onSubmit" >
          <FormField name="email">
            <FormItem>
              <FormLabel class="text-xl">Email</FormLabel>
              <FormControl>
                <Field
                  name="email"
                  as="input"
                  type="email"
                  placeholder="Enter email..."
                  class="shadow-[4px_4px_0px_black] text-base bg-input py-1 px-4 rounded-md border-2 border-black w-full"
                />
              </FormControl>
              <FormMessage>
                <ErrorMessage name="email" />
              </FormMessage>
            </FormItem>
          </FormField>

          <FormField name="password">
            <FormItem>
              <FormLabel class="text-xl">Password</FormLabel>
              <FormControl>
                <Field
                  name="password"
                  as="input"
                  type="password"
                  placeholder="Enter password..."
                  class="shadow-[4px_4px_0px_black] py-1 px-4 rounded-md text-base bg-input border-2 border-black w-full"
                />
              </FormControl>
              <FormMessage>
                <ErrorMessage name="password" />
              </FormMessage>
            </FormItem>
          </FormField>

          <div class="flex justify-center pt-8">
            <Button
              type="submit"
              class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg py-3 text-lg md:text-xl shadow-[4px_4px_0px_black] text-black bg-dark-yellow border-2 border-black active:shadow-[0px_0px_0px_black]"
            >
               {{ loading ? '...' : 'Log In' }}
            </Button>
          </div>

          <p class="text-center">
            Haven’t joined the hub yet?
            <router-link to="/register" class="font-semibold ml-1">
              Create an account
            </router-link>
          </p>
        </VeeForm>
      </div>
    </div>
  </div>
</template>
