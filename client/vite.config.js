/// <reference types="vitest" />
import { fileURLToPath, URL } from "node:url";
// import path from "node:path";
import legacy from '@vitejs/plugin-legacy';
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";
// https://vitejs.dev/config/
export default defineConfig({
    //! for electron 3 lines
    //! import curDirPath, then 👇
    // base: path.join(__dirname, "dist/"),
    plugins: [
        vue(),
        legacy()
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
    test: {
        globals: true,
        environment: 'jsdom'
    },
    esbuild: {
        //for Babel
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
        jsxInject: `import { h, Fragment } from 'vue'`
    },
    optimizeDeps: {
        include: ['@babel/preset-env']
    },
    // build: {
    //   assetsInlineLimit: 0,  // Disable inlining of font files to avoid decoding issues
    //   rollupOptions: {
    //     output: {
    //       assetFileNames: 'assets/[name]-[hash][extname]'  // Ensure correct output paths and names for fonts
    //     }
    //   }
    // }
});
