import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.baderidris.app',
  appName: 'portfolio',
  webDir: 'dist',
  android: {
    allowMixedContent: true,
    includePlugins: ['capacitorCookies', 'capacitorHttp', 'capacitorSplashScreen'],
  },
};

export default config;
