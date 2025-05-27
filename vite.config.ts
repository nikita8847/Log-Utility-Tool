import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://log-validation.ondc.org',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    }, 
    allowedHosts: [
      'resolved-relieved-snake.ngrok-free.app'
    ]
  },
});
