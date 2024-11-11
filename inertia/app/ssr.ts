import { createInertiaApp } from '@inertiajs/svelte'

export default function render(page: any) {
  return createInertiaApp({
    page,
    resolve: (name: string) => {
      const pages = import.meta.glob('../pages/**/*.svelte', { eager: true })
      return pages[`../pages/${name}.svelte`]
    },
  })
}
