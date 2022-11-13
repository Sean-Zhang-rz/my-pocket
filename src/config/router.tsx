// hostory 模式路由 // hash模式
import ErrorPage from '@/pages/Components/ErrorPage';
import MainLayout from '@/pages/Components/MainLayout';
import { createHashRouter, Navigate, Outlet, RouteObject } from 'react-router-dom';
import Welcome from '../pages/Welcome';

const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout title="山竹记账" icon="menu" />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/welcome" replace />,
      },
      {
        path: '/welcome',
        element: <Outlet />,
        children: [
          {
            index: true,
            path: 'welcome/1',
          },
          {
            path: ':id',
            element: <Welcome />,
          },
        ],
      },
    ],
  },
  // {
  //   path: '/welcome',
  //   // component: () => import('@/pages/Welcome'),
  //   // beforeEnter: (_, __, next) => {
  //   //   localStorage.getItem('skipFeature') === 'yes' ? next('/start') : next();
  //   // },
  //   children: [
  //     {
  //       path: '',
  //       element: <Navigate to="/welcome/1" replace />,
  //     },
  //     {
  //       // element: {
  //       // main: () => import('@/pages/Welcome/Components/Render'),
  //       // footer: () => import('@/pages/Welcome/Components/Action'),
  //       // },
  //     },
  //   ],
  // },
]);

export default router;
