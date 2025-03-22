import { createRouter, createWebHashHistory } from 'vue-router';

export const routes = [
  {
    path: '/home',
    component: () => import('@/views/Home'),
    meta: {
      title: '主页'
    }
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/handbook',
    component: () => import('@/views/Handbook'),
    meta: {
      title: '狩猎手册'
    }
  },
  {
    path: '/backup',
    component: () => import('@/views/Backup'),
    meta: {
      title: '备份管理'
    }
  },
  {
    path: '/setting',
    component: () => import('@/views/Setting'),
    meta: {
      title: '设置'
    }
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes
});
