import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  // publicDir: process.env.NODE_ENV === 'production'
  //   ? '/vue-music/'
  //   : '/public/'
  // ,
  plugins: [
    vue(),
    vueJsx({
      babelPlugins: ["@vue/babel-plugin-jsx"]
    }),
  ],
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, './src') + '/'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false
      }
    }
  },
  server: {
    watch: {
      ignored: ['!**/node_modules/**']
    },
    proxy: {
      '^/api': {
        target: 'https://netease-cloud-music-api-dun-nu.vercel.app',
        // target: 'http://localhost:9500',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: process.env.NODE_ENV === 'production'
      }
    }
  }
})
