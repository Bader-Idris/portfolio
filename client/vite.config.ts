/// <reference types="vitest" />

import { fileURLToPath, URL } from "node:url";
// import path from "node:path";

import legacy from '@vitejs/plugin-legacy'
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  //! for electron 3 lines
  //! import curDirPath, then 👇
  // base: path.join(__dirname, "dist/"),
//TODO: 
  // base: "./", // Ensure compatibility with Electron
  plugins: [
    vue(),
    legacy(),
  ],
  // plugins: [
  //   vue({//! for using vidStack
  //     template: {
  //       compilerOptions: {
  //         isCustomElement: (tag) =>
  //           tag.startsWith("media-"),
  //       },
  //     },
  //   }),
  // ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/scss/main.scss";`
      }
    },
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['defaults', 'last 2 versions'],
          grid: 'stable',
          cascade: false
        })
      ]
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  
  esbuild: {
    //for Babel
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import { h, Fragment } from 'vue'`
  },
  optimizeDeps: {
    include: ["@babel/preset-env", "pinia", "@capacitor/core", "vue-router"],
    exclude: ["electron"] // Electron should be excluded from Vite's optimization
  },
  // build: {
  //   assetsInlineLimit: 0,  // Disable inlining of font files to avoid decoding issues
  //   rollupOptions: {
  //     output: {
  //       assetFileNames: 'assets/[name]-[hash][extname]'  // Ensure correct output paths and names for fonts
  //     }
  //   }
  // }

  /* 
  build: {
    minify: "terser", // Ensure minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs for security
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]"
      }
    }
  },
  */
  test: {
    globals: true,
    environment: 'jsdom'
    // setupFiles: "vitest.setup.ts"
  },
});


/* prior package.json scripts 
"scripts": {
    "dev": "vite",
    "build": "run-p type-check \"build-only {@}\" --",
    "preview": "vite preview",
    "build-only": "vite build",
    "type-check": "vue-tsc --build --force",
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "test:unit": "vitest",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    "format": "prettier --write src/",
    // "electron:build": "vue-tsc --noEmit && vite build && electron-builder",
    "electron:build": "vue-tsc --noEmit && vite --config vite.electron.config.ts build && electron-builder",
    // "electron:dev": "vite --config vite.electron.config.ts && electron .",
    // "electron:build": "vite build --config vite.electron.config.ts && electron-builder",
    "ionic:build": "npm run build",
    "ionic:serve": "npm run dev -- --open"
  },
*/