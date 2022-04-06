import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

import Home from '../views/Home.vue';
import Auth from '../layouts/Auth.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/Auth.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: Auth },
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: Auth },
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/map',
    name: 'map',
    meta: { requiresAuth: true },
    component: () => import('../views/Map.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  const authRoutes = ['home', 'auth', 'login', 'register'];
  const isAuthPage = to.matched.some((route) => authRoutes.includes(route.name));
  const isRequiresAuth = to.matched.some((route) => route.meta?.requiresAuth);

  if (isAuthenticated && isAuthPage) {
    next('/map');
  } else if (!isAuthenticated && isRequiresAuth) {
    next('/');
  } else {
    next();
  }
});

export default router;
