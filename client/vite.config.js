/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
// import { ENV } from './libs/constant'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    // proxy: {
    //   '/api': {
    //     target: ENV.API_URL,
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '/api'),
    //   },
    // }
  },
  plugins: [react()],
})
