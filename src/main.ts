import { createApp } from 'vue';
import '@/assets/styles/style.css';
import { argbFromHex, themeFromSourceColor, applyTheme } from '@material/material-color-utilities';
import App from './App.vue';
import router from '@/router';
const theme = themeFromSourceColor(argbFromHex('#00b0ff'));
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(theme, { target: document.body, dark: systemDark });
createApp(App).use(router).mount('#app');
