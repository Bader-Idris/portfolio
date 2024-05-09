
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import AppLink from "@/components/AppLink.vue";
import { createPinia } from "pinia";

// here is where we use ionic
// import Ionic from "@ionic/vue"
// import "@ionic/core/css/ionic.bundle.css";

import "@/assets/css/normalize.css";
import "@/assets/css/fontawesome.min.css";

createApp(App)
  .component("AppLink", AppLink)
  // .use(Ionic)// here we use it!
  .use(router)
  .use(createPinia())
  .mount("#app");
