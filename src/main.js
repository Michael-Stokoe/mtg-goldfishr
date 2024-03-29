import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import store from './store';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import mitt from 'mitt';
const emitter = mitt();


const app = createApp(App);
app.use(router).use(store).use(VueSweetalert2);
app.config.globalProperties.$events = emitter;
app.mount('#app');