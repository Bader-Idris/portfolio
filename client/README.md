# some info

```sh
# this is how to easily handle icon of our capacitor application
npm install @capacitor/assets --save-dev
# but Android 12+ required!
```

Check this [Cap url](https://capacitorjs.com/docs/guides/splash-screens-and-icons) docs

It requires these files:

```sh
assets/
├── icon-only.png
├── icon-foreground.png
├── icon-background.png
├── splash.png
└── splash-dark.png
```

Because I had the files, I only used `npx capacitor-assets generate` without recreating the files!

---

> good tips & tricks

Simon On YouTube, put these as a setup.sh file, Appearingly he's an enemy

```sh
# before these steps, install @ionic/cli @ionic/core && maybe @capacitor/cli also, -g is great here,
# would love to also add ionic/vue ionic/vue-router
ionic start appFile blank --type=vue --capacitor --package-id=com.bader.blabblab # I changed its framework
# --package-id === bundle id, critical to push notifications
cd ./appFile
ionic build
bunx cap add ios android
```

---

Push notification, we need to use a notification provider as `cloud messaging FCM`

The causing of crash is of not adding correct configs with this plugin, check the [official deduced docs](https://capacitorjs.com/docs/apis/push-notifications)

in the capacitor.config.json/ts file, add the part: *it's well set in the docs*

```ts
/// <reference types="@capacitor/push-notifications" />

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    //! This is the important code
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  }
};
export default config;
```

