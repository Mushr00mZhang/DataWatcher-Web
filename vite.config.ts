import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => /^md-/.test(tag),
        },
      },
    }),
  ],
  base: '',
  resolve: {
    alias: {
      '@': '/src/',
    },
  },
  server: {
    proxy: {
      '/interface-watcher/api': {
        target: 'http://localhost:8080',
        // target: 'http://10.77.11.10:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/interface-watcher/, ''),
      },
    },
  },
});
