// vite.config.ts
import { defineConfig } from "file:///home/apisaguy/htdocs/apisaguy.my.id/node_modules/vite/dist/node/index.js";
import adonisjs from "file:///home/apisaguy/htdocs/apisaguy.my.id/node_modules/@adonisjs/vite/build/src/client/main.js";
import inertia from "file:///home/apisaguy/htdocs/apisaguy.my.id/node_modules/@adonisjs/inertia/build/src/plugins/vite.js";
import { svelte } from "file:///home/apisaguy/htdocs/apisaguy.my.id/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";
var vite_config_default = defineConfig({
  plugins: [
    adonisjs({
      /**
       * Entrypoints of your application. Each entrypoint will
       * result in a separate bundle.
       */
      entrypoints: ["resources/css/app.css", "resources/js/app.js"],
      /**
       * Paths to watch and reload the browser on file change
       */
      reload: ["resources/views/**/*.edge"]
    }),
    inertia({ ssr: { enabled: true, entrypoint: "inertia/app/ssr.ts" } }),
    svelte({ compilerOptions: { hydratable: true } }),
    adonisjs({ entrypoints: ["inertia/app/app.ts"], reload: ["resources/views/**/*.edge"] })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9hcGlzYWd1eS9odGRvY3MvYXBpc2FndXkubXkuaWRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2FwaXNhZ3V5L2h0ZG9jcy9hcGlzYWd1eS5teS5pZC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9hcGlzYWd1eS9odGRvY3MvYXBpc2FndXkubXkuaWQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGFkb25pc2pzIGZyb20gJ0BhZG9uaXNqcy92aXRlL2NsaWVudCdcbmltcG9ydCBpbmVydGlhIGZyb20gJ0BhZG9uaXNqcy9pbmVydGlhL2NsaWVudCdcbmltcG9ydCB7IHN2ZWx0ZSB9IGZyb20gJ0BzdmVsdGVqcy92aXRlLXBsdWdpbi1zdmVsdGUnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICBhZG9uaXNqcyh7XG4gICAgICAvKipcbiAgICAgICAqIEVudHJ5cG9pbnRzIG9mIHlvdXIgYXBwbGljYXRpb24uIEVhY2ggZW50cnlwb2ludCB3aWxsXG4gICAgICAgKiByZXN1bHQgaW4gYSBzZXBhcmF0ZSBidW5kbGUuXG4gICAgICAgKi9cbiAgICAgIGVudHJ5cG9pbnRzOiBbJ3Jlc291cmNlcy9jc3MvYXBwLmNzcycsICdyZXNvdXJjZXMvanMvYXBwLmpzJ10sXG5cbiAgICAgIC8qKlxuICAgICAgICogUGF0aHMgdG8gd2F0Y2ggYW5kIHJlbG9hZCB0aGUgYnJvd3NlciBvbiBmaWxlIGNoYW5nZVxuICAgICAgICovXG4gICAgICByZWxvYWQ6IFsncmVzb3VyY2VzL3ZpZXdzLyoqLyouZWRnZSddLFxuICAgIH0pLFxuICAgIGluZXJ0aWEoeyBzc3I6IHsgZW5hYmxlZDogdHJ1ZSwgZW50cnlwb2ludDogJ2luZXJ0aWEvYXBwL3Nzci50cycgfSB9KSxcbiAgICBzdmVsdGUoeyBjb21waWxlck9wdGlvbnM6IHsgaHlkcmF0YWJsZTogdHJ1ZSB9IH0pLFxuICAgIGFkb25pc2pzKHsgZW50cnlwb2ludHM6IFsnaW5lcnRpYS9hcHAvYXBwLnRzJ10sIHJlbG9hZDogWydyZXNvdXJjZXMvdmlld3MvKiovKi5lZGdlJ10gfSlcbiAgXSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThSLFNBQVMsb0JBQW9CO0FBQzNULE9BQU8sY0FBYztBQUNyQixPQUFPLGFBQWE7QUFDcEIsU0FBUyxjQUFjO0FBRXZCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BS1AsYUFBYSxDQUFDLHlCQUF5QixxQkFBcUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUs1RCxRQUFRLENBQUMsMkJBQTJCO0FBQUEsSUFDdEMsQ0FBQztBQUFBLElBQ0QsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTLE1BQU0sWUFBWSxxQkFBcUIsRUFBRSxDQUFDO0FBQUEsSUFDcEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFlBQVksS0FBSyxFQUFFLENBQUM7QUFBQSxJQUNoRCxTQUFTLEVBQUUsYUFBYSxDQUFDLG9CQUFvQixHQUFHLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxDQUFDO0FBQUEsRUFDekY7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
