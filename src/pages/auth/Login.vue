<script setup lang="ts">
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ref } from 'vue';
import { Button } from '@/components/ui/button'

// const email = ref('');
// const password = ref('');

// const handleLogin = () => {
//   console.log('Logging in with:', email.value, password.value);
// };

</script>
<template>
  <div class="flex h-screen">
    <!-- Left side: Logo + Title -->
    <div class="w-1/2 bg-sidebar text-black flex flex-col justify-center items-start px-8 border-r-2 border-black">
      <h1 class="text-7xl  mb-2">Welcome to LAPHUB</h1>
      <p class="text-2xl">Join LAP HUB ---- Share your LAP journey.</p>
      <img src="/public//Street Life Class Picture.svg" alt="Logo" class=" mb-4" />
    </div>

    <!-- Right side: Login Form -->
    <div class="w-1/2 flex flex-col justify-center items-center px-8 bg-grey-blue">
      <div class="w-full max-w-xl">
        <h2 class="text-4xl text-center font-medium mb-6">Login</h2>
        <Form  class="space-y-6">
         
        <FormField name="'title'">
          <FormItem>
            <FormLabel class="text-xl">Email</FormLabel>
            <FormControl>
              <Input  placeholder="Enter email..." class="shadow-[4px_4px_0px_black] text-black bg-input  border border-2 border-black" required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
         <FormField name="'title'">
          <FormItem>
            <FormLabel class="text-xl">Password</FormLabel>
            <FormControl>
              <Input  placeholder="Enter password..." class="shadow-[4px_4px_0px_black] text-black bg-input  border border-2 border-black" required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

       <div class="flex justify-center pt-8 ">
        <Button type="submit" class="px-48 py-3 text-xl shadow-[4px_4px_0px_black] text-black bg-dark-yellow  border border-2 border-black active:shadow-[0px_0px_0px_black]">
          Log In
        </Button>
      </div>
      <p class="text-center">Haven’t joined the hub yet?
        <router-link to="/register">
          <span class="font-semibold">Create an account</span>
        </router-link>
        
      </p>
    </Form>
      </div>
    </div>
  </div>
</template>

