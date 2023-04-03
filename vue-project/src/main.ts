import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

import './assets/styles/style.scss';

import Main from '@/views/Main.vue';
import Orders from '@/views/Orders.vue';
import Products from '@/views/Products.vue';

const myApp = createApp(App);

const routes = [
  { path: '/', name: 'Main', component: Main },
  { path: '/products', name: 'Products', component: Products },
  { path: '/past-orders', name: 'Orders', component: Orders },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

myApp.use(router);

myApp.mount('#app');
