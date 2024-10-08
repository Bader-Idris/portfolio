/// <reference types="@capacitor/push-notifications" />

import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "baderidris.app",
  appName: "Portfolio",
  webDir: "dist",
  plugins: {
    AppIcon: {
      iconPath: "./resources/icon.png",
      splashPath: "./resources/splash.png",
      platforms: ["ios", "android"]
    },
    LocalNotifications: {
      // smallIcon: "./resources/icon.png", android defaults its path to android/app/src/main/res/drawable-hdpi
      // iconColor: "#ffffff",
      // sound: "default", android defaults 👆/src/raw
      // vibrate: true
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  }
};

export default config;
