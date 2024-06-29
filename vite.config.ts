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
      '/api/': 'http://localhost:8080',
    },
  },
});
