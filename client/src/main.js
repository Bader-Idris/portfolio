import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import AppLink from "@/components/AppLink.vue";
import { createPinia } from "pinia";
import { App as CapacitorApp } from "@capacitor/app";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Device } from "@capacitor/device";

import "@/assets/css/normalize.css";
import "@/assets/css/fontawesome.min.css";

async function initializeApp() {
  const deviceInfo = await Device.getInfo();
  const isPC = deviceInfo.platform === 'web' && !deviceInfo.isVirtual;

  createApp(App)
    .component("AppLink", AppLink)
    .use(router)
    .use(createPinia())
    .mount("#app");

  if (!isPC) {
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
  }

  // Handle the back button
  CapacitorApp.addListener('backButton', ({ canGoBack }) => {
    if (!canGoBack && router.currentRoute.value.path === '/') {
      CapacitorApp.exitApp();
    } else {
      router.go(-1);
    }
  });
}

initializeApp();
