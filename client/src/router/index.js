import { createRouter, createWebHistory, useRoute } from 'vue-router'
// check how to import ionic vue router in latest versions
// import { IonicVueRouter } from '@ionic/vue';
import Home from "@/views/Home.vue";
// import sourceData from "@/destinations.json";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    alias: "/home"
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About.vue")
  },
  {
    path: "/projects",
    name: "projects",
    component: () => import("@/views/Projects.vue")
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/Contact.vue")
  },
  {
    path: "/footer",
    name: "footer",
    component: () => import("@/views/FooterView.vue")
  },
  {
    path: "/user/verify-email",
    name: "verifyEmail",
    component: () => import("@/components/VerifyEmail.vue"),
    props: (route) => ({
      token: route.query.token,
      email: route.query.email
    })
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFoundView.vue")
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // scrollBehavior (to, from, savedPosition) {
  //   return savedPosition || new Promise((resolve)=>{
  //     setTimeout(()=> resolve({ top:0 }), 300)
  //   })
  // }
})
// router.beforeEach((to, from)=>{
//   if(to.meta.requiresAuth && !window.user){
//     return {name: 'login', query:{ redirect: to.fullPath }}
//   }
// })
export default router
