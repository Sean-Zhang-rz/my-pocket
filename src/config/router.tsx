// hostory 模式路由 // hash模式
import { createHashRouter, RouteObject } from 'react-router-dom';

const router = createHashRouter([
  // { path: '/', redirect: '/welcome' },
  {
    path: '/',
    element: <div>this is home</div>,
  },
  {
    path: '/login',
    element: <div>this is login</div>,
  },
]);

export default router;
