import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.edge",
    "./resources/**/*.{js,ts,jsx,tsx,vue}",
    './inertia/{pages,components,app,layouts,types,stores,lib,css}/**/*.{ts,tsx,svelte}',
  ],
  theme: {
    extend: {
      fontFamily: {
        geist: ["Geist", "sans-serif"], // Gunakan font Geist untuk semua variasi
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "0rem",
          sm: "2rem",
          md: "0.5rem",
          lg: "0.5rem", // Tidak ada padding untuk layar besar
          xl: "2rem", // Tidak ada padding untuk layar ekstra besar
          "2xl": "0rem",
          "3xl": "0rem",

          // Sesuaikan juga untuk xl jika diperlukan
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1440px",
          "3xl": "1940px",
          // Tambahkan breakpoints untuk 1440px
        },
      },
    },
  },
  plugins: [daisyui],
}

