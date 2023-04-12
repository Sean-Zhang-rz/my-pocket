import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import '@svgstore';
import router from './config/router';
import './App.module.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <RouterProvider router={router}></RouterProvider>
  // </React.StrictMode>
);
