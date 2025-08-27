import { createRouter, createWebHistory } from "vue-router";
import UserDetail from "@/pages/users/UserDetail.vue";
import Home from "@/pages/home/Home.vue";
import ProjectDetail from "@/pages/home/ProjectDetail.vue";
import Users from "@/pages/users/Users.vue";
import Profile from "@/pages/profile/Profile.vue";
import CreateProject from "@/pages/home/CreateProject.vue";
import Login from "@/pages/auth/Login.vue";
import Register from "@/pages/auth/Register.vue";
import { useAuthStore } from "@/store/useAuthStore";

const routes = [
  { path: "/", 
    name: "Home", 
    component: Home, 
    meta: { requiresAuth: true } 
  },
  { path: "/login",
    name : "Login", 
    component: Login 
  },
  { path: "/register", component: Register },
  { path: "/project/:id", name: "ProjectDetail", component: ProjectDetail },
  { path: "/create", component: CreateProject, meta: { requiresAuth: true } },
  {
    path: "/users",
    name: "Users",
    component: Users,
   meta: { requiresAuth: true }
  },
  {
    path: "/users/:id",
    name: "UserDetail",
    component: UserDetail,
    meta: { requiresAuth: true },
    props: true, 
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
   meta: { requiresAuth: true }
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/", 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isLoggedIn = authStore.user || localStorage.getItem('token');

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: "Login" });
  }
  else if ((to.name === "Login" || to.name === "Register") && isLoggedIn) {
    next({ name: "Home" }); 
  }
  else {
    next(); 
  }
});

export default router;
