import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import store from './store';

import Emitter from 'tiny-emitter';
var emitter = new Emitter();

const app = createApp(App);
app.use(router).use(store);
app.config.globalProperties.$events = emitter;
app.mount('#app');