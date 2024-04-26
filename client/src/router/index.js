import { createRouter, createWebHistory, useRoute } from 'vue-router'
import Home from "@/views/Home.vue";
import sourceData from "@/destinations.json";

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
    // path: "/destination/:id/:slug",
    path: "/pages/:id/:slug",
    name: "destination.show",
    component: () => import("@/views/DestinationShow.vue"),
    props: (route) => ({
      ...route.params,
      id: parseInt(route.params.id)
    }),
    beforeEnter(to, from) {
      const exists = sourceData.destinations.find(
        (destination) => destination.id === parseInt(to.params.id)
      );
      if (!exists)
        return {
          name: "NotFound",
          // allows keeping the URL while rendering a different page
          params: {
            pathMatch: to.path.split("/").slice(1)
          },
          query: to.query,
          hash: to.hash
        };
    },
    children: [
      // {
      //   path: ":experienceSlug",
      //   name: "experience.show",
      //   component: () =>
      //     import(
      //       "@/views/ExperienceShow.vue"
      //     ),
      //   props: (route) => ({
      //     ...route.params,
      //     id: parseInt(route.params.id),
      //   }),
      // },
    ]
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
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || new Promise((resolve)=>{
      setTimeout(()=> resolve({ top:0 }), 300)
    })
  }
})
// router.beforeEach((to, from)=>{
//   if(to.meta.requiresAuth && !window.user){
//     return {name: 'login', query:{ redirect: to.fullPath }}
//   }
// })
export default router
