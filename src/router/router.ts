import {  createRouter, createWebHistory } from 'vue-router';

import Login from '@/pages/auth/Login.vue';
import Home from "@/pages/home/Home.vue"
import ProjectDetail from "@/pages/home/ProjectDetail.vue"
import Users from "@/pages/users/Users.vue"
import UsersDetail from "@/pages/users/UsersDetail.vue"

import Dashboard from "@/pages/dashboard/Dashboard.vue"
const routes = [
  { path: "/", name: "Home", component: Home },
   { path: "/project/:id", name: "ProjectDeatil", component: ProjectDetail },
  { path: "/users", name: "Users", component: Users },
   { path: "/user/:username", name: "UsersDetail", component: UsersDetail },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path : "/login", component : Login},
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
 