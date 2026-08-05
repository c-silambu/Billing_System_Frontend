import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/auth': 'http://localhost:3000',
      '/product': 'http://localhost:3000',
      '/bill': 'http://localhost:3000',
      '/dashboard': 'http://localhost:3000',
      '/health': 'http://localhost:3000',
    },
  },
})
