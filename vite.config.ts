import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'
import inertia from '@adonisjs/inertia/client'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [
    adonisjs({
      /**
       * Entrypoints of your application. Each entrypoint will
       * result in a separate bundle.
       */
      entrypoints: ['resources/css/app.css', 'resources/js/app.js'],

      /**
       * Paths to watch and reload the browser on file change
       */
      reload: ['resources/views/**/*.edge'],
    }),
    inertia({ ssr: { enabled: true, entrypoint: 'inertia/app/ssr.ts' } }),
    svelte({ compilerOptions: { hydratable: true } }),
    adonisjs({ entrypoints: ['inertia/app/app.ts'], reload: ['resources/views/**/*.edge'] })
  ],
})
