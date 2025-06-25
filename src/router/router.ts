import {  createRouter, createWebHistory } from 'vue-router';

import Login from '@/pages/auth/Login.vue';
import Home from "@/pages/home/Home.vue"
import Users from "@/pages/users/Users.vue"
import Dashboard from "@/pages/dashboard/Dashboard.vue"
const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/users", name: "Users", component: Users },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path : "/login", component : Login},
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;