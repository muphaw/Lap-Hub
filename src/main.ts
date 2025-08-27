import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import App from './App.vue'
import './assets/index.css'
import router from './router/router'
import { useAuthStore } from './store/useAuthStore'

const queryClient = new QueryClient()
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(VueQueryPlugin, { queryClient })

router.isReady().then(async () => {
  const authStore = useAuthStore()
  await authStore.initialize()
  
  if (!authStore.user && router.currentRoute.value.meta.requiresAuth) {
    router.push('/login')
  }
  
  app.mount('#app')
})
