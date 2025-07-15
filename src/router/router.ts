import { createRouter, createWebHistory } from 'vue-router'

// Page Components
import Login from '@/pages/auth/Login.vue'
import Home from '@/pages/home/Home.vue'
import Users from '@/pages/users/Users.vue'
import Dashboard from '@/pages/dashboard/Dashboard.vue'
import UserDetail from '@/pages/users/UserDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/user/:id',
    name: 'UserDetail',
    component: UserDetail,
    props: true // Enables access to `route.params.id` as a prop
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/' // Optional fallback
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
