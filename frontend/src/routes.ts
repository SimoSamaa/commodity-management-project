import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import AppTable from '@/views/AppTable.vue';

const route = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/' as string,
      redirect: '/products-table' as string
    },
    {
      path: '/products-table' as string,
      component: AppTable,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/products-table' as string,
    },
  ] as RouteRecordRaw[]
});

export default route;