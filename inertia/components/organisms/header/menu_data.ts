import type { Menu } from '~/types/menu'

export const rightMenuData: Menu[] = [
  {
    id: 1,
    title: 'Versions',
    slug: undefined,
    submenu: [
      { id: 1, title: 'v1.0.0', slug: 'v1.0.0' },
      { id: 2, title: 'v2.0.0', slug: 'v2.0.0' },
    ],
  },
  {
    id: 2,
    title: 'Languages',
    slug: undefined,
    selectable: true,
    submenu: [
      { id: 1, title: 'English', slug: 'english' },
      { id: 2, title: 'Vietnamese', slug: 'vietnamese' },
    ],
  },
]
