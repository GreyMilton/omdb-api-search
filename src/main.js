import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');

document.title = import.meta.env.VITE_APP_NAME || 'Movie Search';
