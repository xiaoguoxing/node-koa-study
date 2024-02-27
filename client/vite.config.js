import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
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
  plugins: [vue(),vueJsx()],
})
