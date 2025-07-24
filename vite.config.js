import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Any request starting with /api will be sent to the target server
      '/api': {
        target: 'https://miro.interpause.dev', // The REAL server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // This removes /api before sending
      },
    }
  }
})