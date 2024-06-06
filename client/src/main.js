
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import AppLink from "@/components/AppLink.vue";
import { createPinia } from "pinia";
import { App as CapacitorApp } from "@capacitor/app";
import { StatusBar, Style } from "@capacitor/status-bar";

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

// Hide the status bar
StatusBar.setOverlaysWebView({ overlay: true });
StatusBar.hide();

// Enable full-screen mode to hide navigation bar
CapacitorApp.addListener('appStateChange', ({ isActive }) => {
  if (isActive) {
    document.body.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});


// Handle the back button
CapacitorApp.addListener('backButton', ({ canGoBack }) => {
  if (!canGoBack && router.currentRoute.value.path === '/') {
    CapacitorApp.exitApp();
  } else {
    router.go(-1);
  }
});