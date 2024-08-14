import type { RouterConfig } from 'nuxt/schema';

const nuxtRouter: RouterConfig = {
  routes: () => [
    {
      name: 'App',
      path: '/index.html',
      redirect: '/pc/home/index.html',
    },
    {
      name: 'Index',
      path: '/pc/index.html',
      redirect: '/pc/home/index.html',
    },
    {
      name: 'IndexMb',
      path: '/mobile/index.html',
      redirect: '/mobile/home/index.html',
    },
    {
      name: 'HomeEntry',
      path: '/pc/home',
      redirect: '/pc/home/index.html',
    },
    {
      name: 'Home',
      path: '/pc/home/index.html',
      component: () => import('@/pages/pc/home/index.vue'),
    },
    {
      name: 'HomeMbEntry',
      path: '/mobile/home',
      redirect: '/mobile/home/index.html',
    },
    {
      name: 'HomeMb',
      path: '/mobile/home/index.html',
      component: () => import('@/pages/mobile/home/index.vue'),
    },
    {
      name: 'PageNotFound',
      path: '/404/index.html',
      redirect: '/pc/home/index.html',
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/404/index.html',
    },
  ],
};

export default nuxtRouter;
