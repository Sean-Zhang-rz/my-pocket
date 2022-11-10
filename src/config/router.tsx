// hostory 模式路由 // hash模式
import { createBrowserRouter, createHashRouter } from 'react-router-dom';

const router = createHashRouter([
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
