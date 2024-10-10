import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
// import sourceData from "@/destinations.json";

// Define the route configuration with proper types
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    alias: "/home"
  },
  {
    path: "/register",
    name: "register",
    // Lazy-load the Register component
    component: () => import("@/views/Register.vue")
  },
  {
    path: "/login",
    name: "login",
    // Lazy-load the Login component
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/about",
    name: "about",
    // Lazy-load the About component
    component: () => import("@/views/About.vue")
  },
  {
    path: "/projects",
    name: "projects",
    // Lazy-load the Projects component
    component: () => import("@/views/Projects.vue")
  },
  {
    path: "/contact",
    name: "contact",
    // Lazy-load the Contact component
    component: () => import("@/views/Contact.vue")
  },
  {
    path: "/footer",
    name: "footer",
    // Lazy-load the FooterComp component
    component: () => import("@/components/FooterComp.vue")
  },
  {
    path: "/user/verify-email",
    name: "verifyEmail",
    component: () => import("@/components/VerifyEmail.vue"),
    // Map route query parameters to props with TypeScript typing
    props: (route) => ({
      token: route.query.token as string,
      email: route.query.email as string
    })
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    // Lazy-load the NotFoundView component
    component: () => import("@/views/NotFoundView.vue")
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
  // scrollBehavior (to, from, savedPosition) {
  //   return savedPosition || new Promise((resolve)=>{
  //     setTimeout(()=> resolve({ top:0 }), 300)
  //   })
  // }
});
// router.beforeEach((to, from)=>{
//   if(to.meta.requiresAuth && !window.user){
//     return {name: 'login', query:{ redirect: to.fullPath }}
//   }
// })
export default router;
