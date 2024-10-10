/// <reference types="vitest" />

import { fileURLToPath, URL } from "node:url";
// import path from "node:path";

import legacy from '@vitejs/plugin-legacy'
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy(),
  ],
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
  test: {
    globals: true,
    environment: 'jsdom'
    // setupFiles: "vitest.setup.ts"
  },
});
