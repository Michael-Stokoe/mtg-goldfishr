import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';

const routes = [
    {
       path: '/',
       name: 'home',
       component: HomePage
    },
    {
        path: '/game/:game',
        name: 'game',
        component: () => import('../views/GamePage.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;