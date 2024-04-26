import "@/assets/css/normalize.css";
import "@/assets/css/fontawesome.min.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import AppLink from "@/components/AppLink.vue";
import { createPinia } from "pinia";

createApp(App)
  .component("AppLink", AppLink)
  .use(router)
  .use(createPinia())
  .mount("#app");
