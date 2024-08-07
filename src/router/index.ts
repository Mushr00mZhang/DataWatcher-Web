import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import List from '@/components/watcher/Index.vue';
import Detail from '@/components/watcher/Detail.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: {
      title: '首页',
    },
    component: () => import('@/components/index/Index.vue'),
  },
  {
    path: '/list',
    meta: {
      title: '监控列表',
    },
    // component: () => import('@/components/watcher/Index.vue'),
    // component: List,
    children: [
      {
        path: '',
        meta: {
          title: '监控列表',
        },
        // component: () => import('@/components/watcher/Index.vue'),
        component: List,
      },
      {
        path: 'detail',
        meta: {
          title: '详情',
        },
        // component: () => import('@/components/watcher/Detail.vue'),
        component: Detail,
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory('interface-watcher'),
  routes,
});
export default router;
