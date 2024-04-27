// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///E:/coding_and_programming/portfolio/client/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/coding_and_programming/portfolio/client/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import autoprefixer from "file:///E:/coding_and_programming/portfolio/client/node_modules/autoprefixer/lib/autoprefixer.js";
var __vite_injected_original_import_meta_url = "file:///E:/coding_and_programming/portfolio/client/vite.config.js";
var vite_config_default = defineConfig({
  //! for electron 3 lines
  //! import curDirPath, then 👇
  // base: path.join(__dirname, "dist/"),
  plugins: [vue()],
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
            "Opera >= 12",
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
  server: {
    //! check if it's useful!
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  },
  esbuild: {
    //for Babel
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: `import { h, Fragment } from 'vue'`
  },
  optimizeDeps: {
    include: ["@babel/preset-env"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxjb2RpbmdfYW5kX3Byb2dyYW1taW5nXFxcXHBvcnRmb2xpb1xcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGNvZGluZ19hbmRfcHJvZ3JhbW1pbmdcXFxccG9ydGZvbGlvXFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovY29kaW5nX2FuZF9wcm9ncmFtbWluZy9wb3J0Zm9saW8vY2xpZW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XHJcbi8vIGltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcclxuXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xyXG5cclxuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tIFwiYXV0b3ByZWZpeGVyXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIC8vISBmb3IgZWxlY3Ryb24gMyBsaW5lc1xyXG4gIC8vISBpbXBvcnQgY3VyRGlyUGF0aCwgdGhlbiBcdUQ4M0RcdURDNDdcclxuICAvLyBiYXNlOiBwYXRoLmpvaW4oX19kaXJuYW1lLCBcImRpc3QvXCIpLFxyXG4gIHBsdWdpbnM6IFt2dWUoKV0sXHJcbiAgLy8gcGx1Z2luczogW1xyXG4gIC8vICAgdnVlKHsvLyEgZm9yIHVzaW5nIHZpZFN0YWNrXHJcbiAgLy8gICAgIHRlbXBsYXRlOiB7XHJcbiAgLy8gICAgICAgY29tcGlsZXJPcHRpb25zOiB7XHJcbiAgLy8gICAgICAgICBpc0N1c3RvbUVsZW1lbnQ6ICh0YWcpID0+XHJcbiAgLy8gICAgICAgICAgIHRhZy5zdGFydHNXaXRoKFwibWVkaWEtXCIpLFxyXG4gIC8vICAgICAgIH0sXHJcbiAgLy8gICAgIH0sXHJcbiAgLy8gICB9KSxcclxuICAvLyBdLFxyXG4gIGNzczoge1xyXG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICBzY3NzOiB7XHJcbiAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiLi9zcmMvYXNzZXRzL3Njc3MvbWFpbi5zY3NzXCI7YFxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgcG9zdGNzczoge1xyXG4gICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgYXV0b3ByZWZpeGVyKHtcclxuICAgICAgICAgIG92ZXJyaWRlQnJvd3NlcnNsaXN0OiBbXHJcbiAgICAgICAgICAgICdkZWZhdWx0cycsXHJcbiAgICAgICAgICAgICdsYXN0IDIgdmVyc2lvbnMnLFxyXG4gICAgICAgICAgICAnT3BlcmEgPj0gMTInLFxyXG4gICAgICAgICAgICAnRWRnZSA+PSAxMicsXHJcbiAgICAgICAgICAgICdGaXJlZm94ID49IDIwJ1xyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIGdyaWQ6ICdzdGFibGUnLFxyXG4gICAgICAgICAgZmxleGJveDogJ21vZGVybicsXHJcbiAgICAgICAgICBjYXNjYWRlOiBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICAgIF1cclxuICAgIH1cclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXHJcbiAgICB9XHJcbiAgfSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIC8vISBjaGVjayBpZiBpdCdzIHVzZWZ1bCFcclxuICAgIHByb3h5OiB7XHJcbiAgICAgICcvYXBpJzoge1xyXG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMCcsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgICAgd3M6IHRydWVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZXNidWlsZDoge1xyXG4gICAgLy9mb3IgQmFiZWxcclxuICAgIGpzeEZhY3Rvcnk6ICdoJyxcclxuICAgIGpzeEZyYWdtZW50OiAnRnJhZ21lbnQnLFxyXG4gICAganN4SW5qZWN0OiBgaW1wb3J0IHsgaCwgRnJhZ21lbnQgfSBmcm9tICd2dWUnYFxyXG4gIH0sXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBpbmNsdWRlOiBbJ0BiYWJlbC9wcmVzZXQtZW52J11cclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1QsU0FBUyxlQUFlLFdBQVc7QUFHM1YsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBRWhCLE9BQU8sa0JBQWtCO0FBTjBLLElBQU0sMkNBQTJDO0FBU3BQLElBQU8sc0JBQVEsYUFBYTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBSTFCLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBV2YsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUEsUUFDUCxhQUFhO0FBQUEsVUFDWCxzQkFBc0I7QUFBQSxZQUNwQjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsVUFDQSxNQUFNO0FBQUEsVUFDTixTQUFTO0FBQUEsVUFDVCxTQUFTO0FBQUEsUUFDWCxDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBO0FBQUEsSUFFTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUEsUUFDUixJQUFJO0FBQUEsTUFDTjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUE7QUFBQSxJQUVQLFlBQVk7QUFBQSxJQUNaLGFBQWE7QUFBQSxJQUNiLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsbUJBQW1CO0FBQUEsRUFDL0I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
