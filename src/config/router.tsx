// hostory 模式路由 // hash模式
import { createHashRouter, Navigate, Outlet } from 'react-router-dom';
import ErrorPage from '@/Components/ErrorPage';
import StartPage from '@/pages/StartPage/inedx';
import SignInPage from '@/pages/SignIn/index';
import WelcomeRedirection from '@/pages/Welcome/Components/WelocomeRedirection';
// import ItemList from '@/pages/Item';
// import ItemCreate from '@/pages/Item/components/Create';
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
      {
        path: '/sign-in',
        element: <SignInPage />
      },
      {
        path: '/items',
        element: <Outlet />,
        children: [
          {
            path: '',
            // element: <ItemList />,
          },
          {
            path: 'create',
            // element: <ItemCreate />,
          },

        ],
      },
    ],
  },
]);

export default router;
