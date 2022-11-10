// hostory 模式路由 // hash模式
import { createHashRouter, RouteObject } from 'react-router-dom';

const router = createHashRouter([
  // { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    // component: () => import('@/pages/Welcome'),
    // beforeEnter: (_, __, next) => {
    //   localStorage.getItem('skipFeature') === 'yes' ? next('/start') : next();
    // },
    children: [
      {
        path: '',
        // redirect: '/welcome/1',
      },
      {
        path: ':id',
        // element: {
        // main: () => import('@/pages/Welcome/Components/Render'),
        // footer: () => import('@/pages/Welcome/Components/Action'),
        // },
      },
    ],
  },
]);

export default router;
