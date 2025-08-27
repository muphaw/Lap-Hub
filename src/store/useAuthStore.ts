import { defineStore } from 'pinia'
import type { User } from '@/types/users'
import { handleLogin, handleRegister } from '@/service/authService'
import { fetchStudentProfile } from '@/service/studentService'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token') || '', 
    loading: false,
    error: null as any
  }),
  actions: {
    async login(email: string, password: string) {
      this.loading = true
        try {
          const { access_token, user } = await handleLogin(email, password)
          console.log("Login user:", user) 
          let profile = {}
          try {
            profile = await fetchStudentProfile(user.student_id)
          } catch (err) {
            console.warn('Profile fetch failed', err)
          }

          this.user = { ...user, ...profile }

          this.token = access_token
          localStorage.setItem('token', this.token)

          console.log("User in store after login:", this.user) 
        } finally {
          this.loading = false
        }
    },
    async register(uni_id: number, email: string, password: string, password_confirmation: string) {
      this.loading = true
      try {
        const { access_token, user } = await handleRegister(uni_id, email, password, password_confirmation)
        this.token = access_token
        this.user = user
        localStorage.setItem('token', this.token)
         try {
      const profile = await fetchStudentProfile(user.student_id)
      this.user = { ...this.user, ...profile }
    } catch (profileError) {
      console.warn('Profile fetch failed, continuing with basic user data', profileError)
    }
      } finally {
        this.loading = false
      }
    },
     logout() {
      this.user = null
      this.token = ''
      localStorage.removeItem('token') 
    },
    initialize() {
    const token = localStorage.getItem('token');
    if (token && !this.user) {
      this.token = token;
    }
  }
  },
  persist: true
})
