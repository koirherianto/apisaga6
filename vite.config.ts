import { defineConfig } from 'vite'
import { getDirname } from '@adonisjs/core/helpers'
import adonisjs from '@adonisjs/vite/client'
import inertia from '@adonisjs/inertia/client'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'

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
    svelte({
      compilerOptions: { hydratable: true },
      preprocess: sveltePreprocess({ typescript: true }),
    }),
    inertia({ ssr: { enabled: true, entrypoint: 'inertia/app/ssr.ts' } }),
    adonisjs({ entrypoints: ['inertia/app/app.ts'], reload: ['resources/views/**/*.edge'] }),
  ],

  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      '~/': `${getDirname(import.meta.url)}/inertia/`,
    },
  },
})
