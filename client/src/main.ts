import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import AppLink from "@/components/AppLink.vue";
import CustomButtons from "@/components/CustomButtons.vue";
import TheNavigation from "@/components/TheNavigation.vue";
import { createPinia } from "pinia";
import { App as CapacitorApp } from "@capacitor/app";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Device } from "@capacitor/device";

// Import notification service
import {
  registerPushNotifications,
  scheduleWelcomeNotification
} from "@/services/notificationService";

import "@/assets/css/normalize.css";
import "@/assets/css/fontawesome.min.css";

// electron, check ths repo https://github.com/electron-vite/electron-vite-vue
// import './demos/ipc' or 👇
// import './demos/node'

async function initializeApp() {
  try {
    const deviceInfo = await Device.getInfo();
    const isPC = deviceInfo.platform === "web" && !deviceInfo.isVirtual;

    const app = createApp(App);
    app.component("AppLink", AppLink);
    app.component("CustomButtons", CustomButtons); // set as a global component
    app.component("TheNavigation", TheNavigation);
    app.use(router);
    app.use(createPinia());
    // app.mount("#app");
    // use 👇 with prioritizing routing security!
    // as with using Async navigation guards, Dynamic imports for route components, and Redirection logic
    router.isReady().then(() => {
      app.mount("#app")
      .$nextTick(() => { // 👇 3 are from electron repo above
        postMessage({ payload: 'removeLoading' }, '*')
      })
    });

    if (!isPC) {
      // Change the status bar style
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: "#01080E" });

      if (deviceInfo.platform === "android") {
        document.body.requestFullscreen();
      }

      // Register notifications
      await registerNotifications();
    }

    CapacitorApp.addListener("backButton", ({ canGoBack }) => {
      if (!canGoBack && router.currentRoute.value.path === "/") {
        CapacitorApp.exitApp();
      } else {
        router.go(-1);
      }
    });
  } catch (error) {
    console.error("Error initializing the app:", error);
  }
}

// Separate async function for notification registration
async function registerNotifications() {
  try {
    await registerPushNotifications();
    await scheduleWelcomeNotification();
  } catch (error) {
    console.error("Notification registration failed: ", error);
  }
}

initializeApp();
