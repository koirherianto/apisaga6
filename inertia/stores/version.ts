import { writable } from 'svelte/store'
import type { Version } from '~/types/version'

export const versionStore = writable<Version[]>([])
