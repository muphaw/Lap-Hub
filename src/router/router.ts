import {  createRouter, createWebHistory } from 'vue-router';

import Home from "@/pages/home/Home.vue"
import Users from "@/pages/users/Users.vue"
import Dashboard from "@/pages/dashboard/Dashboard.vue"
import CreateProject from '@/pages/home/CreateProject.vue';
import Login from '@/pages/auth/Login.vue';
import Register from '@/pages/auth/Register.vue';

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/users", name: "Users", component: Users },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path : "/create", component : CreateProject},
  {path : "/login",component : Login},
  {path : "/register",component : Register}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;