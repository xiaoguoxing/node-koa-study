import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target:'http://127.0.0.1:3000',
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
    host:'0.0.0.0',
    port:'1223'
  },
  plugins: [vue()],
})
