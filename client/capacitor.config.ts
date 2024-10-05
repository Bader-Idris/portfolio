import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "baderidris.app",
  appName: "Portfolio",
  webDir: "dist",
  plugins: {
    AppIcon: {
      iconPath: "./resources/icon.png",
      splashPath: "./resources/splash.png",
      platforms: ["ios", "android"]
    }
  }
};

export default config;