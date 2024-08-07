import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import AppLink from "@/components/AppLink.vue";
import { createPinia } from "pinia";
import { App as CapacitorApp } from "@capacitor/app";
import { LocalNotifications } from "@capacitor/local-notifications";
import { PushNotifications } from "@capacitor/push-notifications";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Device } from "@capacitor/device";

import "@/assets/css/normalize.css";
import "@/assets/css/fontawesome.min.css";

// Import the notification service
import {
  registerPushNotifications,
  scheduleWelcomeNotification
} from "@/services/notificationService";

async function initializeApp() {
  const deviceInfo = await Device.getInfo();
  const isPC = deviceInfo.platform === "web" && !deviceInfo.isVirtual;

  const app = createApp(App);
  app.component("AppLink", AppLink);
  app.use(router);
  app.use(createPinia());
  app.mount("#app");

  if (!isPC) {
    // Change the status bar style and color without hiding it
    StatusBar.setStyle({ style: Style.Dark });
    StatusBar.setBackgroundColor({ color: "#01080E" }); // Set to your desired color

    // Manage the bottom navigation bar (Android example)
    if (deviceInfo.platform === "android") {
      // Hide the bottom navigation bar (requires full screen mode)
      document.body.requestFullscreen();
      // Add custom styles or scripts to handle bottom navigation bar if needed
    }
  }

  // Handle the back button
  CapacitorApp.addListener("backButton", ({ canGoBack }) => {
    if (!canGoBack && router.currentRoute.value.path === "/") {
      CapacitorApp.exitApp();
    } else {
      router.go(-1);
    }
  });

  // Register push notifications
  registerPushNotifications();

  // Schedule the welcome notification
  await scheduleWelcomeNotification();
}

initializeApp();
