/// <reference types="vitest" />

import { fileURLToPath, URL } from "node:url";
// import path from "node:path";

import legacy from '@vitejs/plugin-legacy'
import { nodePolyfills } from "vite-plugin-node-polyfills";
// import { VitePluginElectronBuilder } from "vite-plugin-electron-builder";
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
    nodePolyfills(), // Node.js polyfills for Electron
    /* 
    legacy({
      targets: ["defaults", "not IE 11"] // Only include legacy support for older browsers if needed
    }),
    nodePolyfills(), // Node.js polyfills for Electron
    VitePluginElectronBuilder({
      // Add Electron builder for specific Electron configurations
      root: "./",
      electronMain: "./electron/main.ts",
      electronPreload: "./electron/preload.ts",
      outdir: "dist-electron"
    })
    */
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
          overrideBrowserslist: [
            'defaults',
            'last 2 versions',
            'Edge >= 12',
            'Firefox >= 20'
          ],
          grid: 'stable',
          flexbox: 'modern',
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
