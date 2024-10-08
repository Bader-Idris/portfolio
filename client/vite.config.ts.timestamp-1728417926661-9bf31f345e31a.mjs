// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import legacy from "file:///E:/coding_and_programming/portfolio/client/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import { nodePolyfills } from "file:///E:/coding_and_programming/portfolio/client/node_modules/vite-plugin-node-polyfills/dist/index.js";
import vue from "file:///E:/coding_and_programming/portfolio/client/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import autoprefixer from "file:///E:/coding_and_programming/portfolio/client/node_modules/autoprefixer/lib/autoprefixer.js";
import { defineConfig } from "file:///E:/coding_and_programming/portfolio/client/node_modules/vite/dist/node/index.js";
var __vite_injected_original_import_meta_url = "file:///E:/coding_and_programming/portfolio/client/vite.config.ts";
var vite_config_default = defineConfig({
  //! for electron 3 lines
  //! import curDirPath, then 👇
  // base: path.join(__dirname, "dist/"),
  //TODO: 
  // base: "./", // Ensure compatibility with Electron
  plugins: [
    vue(),
    legacy(),
    nodePolyfills()
    // Node.js polyfills for Electron
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
            "defaults",
            "last 2 versions",
            "Edge >= 12",
            "Firefox >= 20"
          ],
          grid: "stable",
          flexbox: "modern",
          cascade: false
        })
      ]
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  esbuild: {
    //for Babel
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: `import { h, Fragment } from 'vue'`
  },
  optimizeDeps: {
    include: ["@babel/preset-env", "pinia", "@capacitor/core", "vue-router"],
    exclude: ["electron"]
    // Electron should be excluded from Vite's optimization
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
    environment: "jsdom"
    // setupFiles: "vitest.setup.ts"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxjb2RpbmdfYW5kX3Byb2dyYW1taW5nXFxcXHBvcnRmb2xpb1xcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGNvZGluZ19hbmRfcHJvZ3JhbW1pbmdcXFxccG9ydGZvbGlvXFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovY29kaW5nX2FuZF9wcm9ncmFtbWluZy9wb3J0Zm9saW8vY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxyXG5cclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XHJcbi8vIGltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcclxuXHJcbmltcG9ydCBsZWdhY3kgZnJvbSAnQHZpdGVqcy9wbHVnaW4tbGVnYWN5J1xyXG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSBcInZpdGUtcGx1Z2luLW5vZGUtcG9seWZpbGxzXCI7XHJcbi8vIGltcG9ydCB7IFZpdGVQbHVnaW5FbGVjdHJvbkJ1aWxkZXIgfSBmcm9tIFwidml0ZS1wbHVnaW4tZWxlY3Ryb24tYnVpbGRlclwiO1xyXG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcclxuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tIFwiYXV0b3ByZWZpeGVyXCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIC8vISBmb3IgZWxlY3Ryb24gMyBsaW5lc1xyXG4gIC8vISBpbXBvcnQgY3VyRGlyUGF0aCwgdGhlbiBcdUQ4M0RcdURDNDdcclxuICAvLyBiYXNlOiBwYXRoLmpvaW4oX19kaXJuYW1lLCBcImRpc3QvXCIpLFxyXG4vL1RPRE86IFxyXG4gIC8vIGJhc2U6IFwiLi9cIiwgLy8gRW5zdXJlIGNvbXBhdGliaWxpdHkgd2l0aCBFbGVjdHJvblxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgbGVnYWN5KCksXHJcbiAgICBub2RlUG9seWZpbGxzKCksIC8vIE5vZGUuanMgcG9seWZpbGxzIGZvciBFbGVjdHJvblxyXG4gICAgLyogXHJcbiAgICBsZWdhY3koe1xyXG4gICAgICB0YXJnZXRzOiBbXCJkZWZhdWx0c1wiLCBcIm5vdCBJRSAxMVwiXSAvLyBPbmx5IGluY2x1ZGUgbGVnYWN5IHN1cHBvcnQgZm9yIG9sZGVyIGJyb3dzZXJzIGlmIG5lZWRlZFxyXG4gICAgfSksXHJcbiAgICBub2RlUG9seWZpbGxzKCksIC8vIE5vZGUuanMgcG9seWZpbGxzIGZvciBFbGVjdHJvblxyXG4gICAgVml0ZVBsdWdpbkVsZWN0cm9uQnVpbGRlcih7XHJcbiAgICAgIC8vIEFkZCBFbGVjdHJvbiBidWlsZGVyIGZvciBzcGVjaWZpYyBFbGVjdHJvbiBjb25maWd1cmF0aW9uc1xyXG4gICAgICByb290OiBcIi4vXCIsXHJcbiAgICAgIGVsZWN0cm9uTWFpbjogXCIuL2VsZWN0cm9uL21haW4udHNcIixcclxuICAgICAgZWxlY3Ryb25QcmVsb2FkOiBcIi4vZWxlY3Ryb24vcHJlbG9hZC50c1wiLFxyXG4gICAgICBvdXRkaXI6IFwiZGlzdC1lbGVjdHJvblwiXHJcbiAgICB9KVxyXG4gICAgKi9cclxuICBdLFxyXG4gIC8vIHBsdWdpbnM6IFtcclxuICAvLyAgIHZ1ZSh7Ly8hIGZvciB1c2luZyB2aWRTdGFja1xyXG4gIC8vICAgICB0ZW1wbGF0ZToge1xyXG4gIC8vICAgICAgIGNvbXBpbGVyT3B0aW9uczoge1xyXG4gIC8vICAgICAgICAgaXNDdXN0b21FbGVtZW50OiAodGFnKSA9PlxyXG4gIC8vICAgICAgICAgICB0YWcuc3RhcnRzV2l0aChcIm1lZGlhLVwiKSxcclxuICAvLyAgICAgICB9LFxyXG4gIC8vICAgICB9LFxyXG4gIC8vICAgfSksXHJcbiAgLy8gXSxcclxuICBjc3M6IHtcclxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgc2Nzczoge1xyXG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCBcIi4vc3JjL2Fzc2V0cy9zY3NzL21haW4uc2Nzc1wiO2BcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBvc3Rjc3M6IHtcclxuICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgIGF1dG9wcmVmaXhlcih7XHJcbiAgICAgICAgICBvdmVycmlkZUJyb3dzZXJzbGlzdDogW1xyXG4gICAgICAgICAgICAnZGVmYXVsdHMnLFxyXG4gICAgICAgICAgICAnbGFzdCAyIHZlcnNpb25zJyxcclxuICAgICAgICAgICAgJ0VkZ2UgPj0gMTInLFxyXG4gICAgICAgICAgICAnRmlyZWZveCA+PSAyMCdcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBncmlkOiAnc3RhYmxlJyxcclxuICAgICAgICAgIGZsZXhib3g6ICdtb2Rlcm4nLFxyXG4gICAgICAgICAgY2FzY2FkZTogZmFsc2VcclxuICAgICAgICB9KVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkBcIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmNcIiwgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgIH1cclxuICB9LFxyXG4gIFxyXG4gIGVzYnVpbGQ6IHtcclxuICAgIC8vZm9yIEJhYmVsXHJcbiAgICBqc3hGYWN0b3J5OiAnaCcsXHJcbiAgICBqc3hGcmFnbWVudDogJ0ZyYWdtZW50JyxcclxuICAgIGpzeEluamVjdDogYGltcG9ydCB7IGgsIEZyYWdtZW50IH0gZnJvbSAndnVlJ2BcclxuICB9LFxyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgaW5jbHVkZTogW1wiQGJhYmVsL3ByZXNldC1lbnZcIiwgXCJwaW5pYVwiLCBcIkBjYXBhY2l0b3IvY29yZVwiLCBcInZ1ZS1yb3V0ZXJcIl0sXHJcbiAgICBleGNsdWRlOiBbXCJlbGVjdHJvblwiXSAvLyBFbGVjdHJvbiBzaG91bGQgYmUgZXhjbHVkZWQgZnJvbSBWaXRlJ3Mgb3B0aW1pemF0aW9uXHJcbiAgfSxcclxuICAvLyBidWlsZDoge1xyXG4gIC8vICAgYXNzZXRzSW5saW5lTGltaXQ6IDAsICAvLyBEaXNhYmxlIGlubGluaW5nIG9mIGZvbnQgZmlsZXMgdG8gYXZvaWQgZGVjb2RpbmcgaXNzdWVzXHJcbiAgLy8gICByb2xsdXBPcHRpb25zOiB7XHJcbiAgLy8gICAgIG91dHB1dDoge1xyXG4gIC8vICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS1baGFzaF1bZXh0bmFtZV0nICAvLyBFbnN1cmUgY29ycmVjdCBvdXRwdXQgcGF0aHMgYW5kIG5hbWVzIGZvciBmb250c1xyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9XHJcbiAgLy8gfVxyXG5cclxuICAvKiBcclxuICBidWlsZDoge1xyXG4gICAgbWluaWZ5OiBcInRlcnNlclwiLCAvLyBFbnN1cmUgbWluaWZpY2F0aW9uXHJcbiAgICB0ZXJzZXJPcHRpb25zOiB7XHJcbiAgICAgIGNvbXByZXNzOiB7XHJcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLCAvLyBSZW1vdmUgY29uc29sZSBsb2dzIGZvciBzZWN1cml0eVxyXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWVcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6IFwiYXNzZXRzL1tuYW1lXS1baGFzaF1bZXh0bmFtZV1cIlxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICAqL1xyXG4gIHRlc3Q6IHtcclxuICAgIGdsb2JhbHM6IHRydWUsXHJcbiAgICBlbnZpcm9ubWVudDogJ2pzZG9tJ1xyXG4gICAgLy8gc2V0dXBGaWxlczogXCJ2aXRlc3Quc2V0dXAudHNcIlxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBUyxlQUFlLFdBQVc7QUFHbkMsT0FBTyxZQUFZO0FBQ25CLFNBQVMscUJBQXFCO0FBRTlCLE9BQU8sU0FBUztBQUNoQixPQUFPLGtCQUFrQjtBQUN6QixTQUFTLG9CQUFvQjtBQVZzSyxJQUFNLDJDQUEyQztBQWFwUCxJQUFPLHNCQUFRLGFBQWE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFNMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsY0FBYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQWNoQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFXQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLFNBQVM7QUFBQSxRQUNQLGFBQWE7QUFBQSxVQUNYLHNCQUFzQjtBQUFBLFlBQ3BCO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFVBQ0EsTUFBTTtBQUFBLFVBQ04sU0FBUztBQUFBLFVBQ1QsU0FBUztBQUFBLFFBQ1gsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUVBLFNBQVM7QUFBQTtBQUFBLElBRVAsWUFBWTtBQUFBLElBQ1osYUFBYTtBQUFBLElBQ2IsV0FBVztBQUFBLEVBQ2I7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxxQkFBcUIsU0FBUyxtQkFBbUIsWUFBWTtBQUFBLElBQ3ZFLFNBQVMsQ0FBQyxVQUFVO0FBQUE7QUFBQSxFQUN0QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBMEJBLE1BQU07QUFBQSxJQUNKLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQTtBQUFBLEVBRWY7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
