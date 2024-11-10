// src/lib/useActiveSegment.ts
import { writable, derived } from 'svelte/store'
import { onMount } from 'svelte'

// Store untuk menyimpan segmen aktif
export const activeSegment = writable<string>('')

// Fungsi untuk mendapatkan segmen aktif dari URL
function getCurrentSegment() {
  const path = window.location.hash.slice(1) // Contoh: "#/editor"
  return path.split('/')[1] || '' // Contoh: "editor"
}

// Jalankan saat komponen di-mount (hanya di browser)
onMount(() => {
  // Set nilai awal saat komponen terpasang
  activeSegment.set(getCurrentSegment())

  // Update saat hash berubah
  const updateSegment = () => activeSegment.set(getCurrentSegment())
  window.addEventListener('hashchange', updateSegment)

  // Cleanup event listener saat komponen di-unmount
  return () => window.removeEventListener('hashchange', updateSegment)
})

// Custom hook untuk memeriksa apakah segmen aktif cocok dengan input
export function useActiveSegment(targetSegment: string) {
  return derived(activeSegment, (segment) => segment === targetSegment)
}
