import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/watcher',
    meta: {
      title: '监控列表',
    },
    component: () => import('@/components/watcher/Index.vue'),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
