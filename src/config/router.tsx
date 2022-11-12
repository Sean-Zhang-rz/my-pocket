// hostory 模式路由 // hash模式
import ErrorPage from '@/pages/Components/ErrorPage';
import { createHashRouter, Navigate, RouteObject } from 'react-router-dom';
import Welcome from '../pages/Welcome';

const router = createHashRouter([
  { path: '/', element: <Navigate to="/welcome" replace />, errorElement: <ErrorPage></ErrorPage> },
  {
    path: '/welcome',
    // component: () => import('@/pages/Welcome'),
    // beforeEnter: (_, __, next) => {
    //   localStorage.getItem('skipFeature') === 'yes' ? next('/start') : next();
    // },
    children: [
      {
        path: '',
        element: <Navigate to="/welcome/1" replace />,
      },
      {
        path: ':id',
        element: <Welcome />,
        // element: {
        // main: () => import('@/pages/Welcome/Components/Render'),
        // footer: () => import('@/pages/Welcome/Components/Action'),
        // },
      },
    ],
  },
]);

export default router;
