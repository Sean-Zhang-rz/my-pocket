// hostory 模式路由 // hash模式
import ErrorPage from '@/pages/Components/ErrorPage';
import MainLayout from '@/pages/Components/MainLayout';
import { createHashRouter, Navigate, Outlet, RouteObject } from 'react-router-dom';
import Welcome from '../pages/Welcome';

const router = createHashRouter([
  {
    path: '/',
    element: <Outlet />,
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
            element: <Navigate to="/welcome/1" replace />,
          },
          {
            path: ':id',
            element: <Welcome />,
          },
        ],
      },
    ],
  },
]);

export default router;
