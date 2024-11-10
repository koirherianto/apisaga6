import type { Menu } from '~/types/menu'
import type { Post } from '~/types/post'

import { writable } from 'svelte/store'

export const postStore = writable<Menu[] | Post[]>([])
