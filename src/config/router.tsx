// hostory 模式路由 // hash模式
import { createHashRouter, Navigate, Outlet } from 'react-router-dom';
import ErrorPage from '@/pages/Components/ErrorPage';
import StartPage from '@/pages/StartPage/inedx';
import Welcome from '../pages/Welcome';
import WelcomeRedirection from '@/pages/Welcome/Components/WelocomeRedirection';

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
        element: <WelcomeRedirection />,
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
      {
        path: '/start',
        element: <StartPage />,
      },
    ],
  },
]);

export default router;
