import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import api from './plugins/api';

import '@/assets/style/vars.css';
import '@/assets/style/style.css';
import '@/assets/style/fonts.css';

const app = createApp(App);

app.config.globalProperties.$api = api;
store.$api = api;

app.use(router).use(store)
  .mount('#app');
