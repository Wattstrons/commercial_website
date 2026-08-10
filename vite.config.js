import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteCompression(),
  ],

  // Server proxy removed because API calls use absolute URLs

  build: {
    // Vite 8 / Rolldown handles code splitting automatically
  },
})
