import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: {
      title: '首页',
    },
    component: () => import('@/components/index/Index.vue'),
  },
  {
    path: '/watcher',
    meta: {
      title: '监控列表',
    },
    component: () => import('@/components/watcher/Index.vue'),
    children: [
      {
        path: '/detail/{app}',
        meta: {
          title: '详情',
        },
        component: () => import('@/components/watcher/Detail.vue'),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
