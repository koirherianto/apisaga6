import { writable } from 'svelte/store'
import type { Language } from '~/types/language'

export const languagesStore = writable<Language[]>([])
