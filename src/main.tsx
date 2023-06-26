import React from 'react';
import 'virtual:uno.css';

import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import '@svgstore';
import router from './config/router';
import './App.module.scss';
// import 'uno.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <RouterProvider router={router}></RouterProvider>
  // </React.StrictMode>
);
