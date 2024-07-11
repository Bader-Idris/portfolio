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
