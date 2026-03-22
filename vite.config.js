import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Đặt base là './' để có thể chạy trực tiếp file index.html 
  // trên trình duyệt hoặc host tĩnh như GitHub Pages mà không bị lỗi 404 assets
  base: './', 
})
