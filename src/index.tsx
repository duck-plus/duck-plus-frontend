import 'simplebar/dist/simplebar.css';
import '@/global.css';
import 'react-medium-image-zoom/dist/styles.css';

import React from 'react';

import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';

import reportWebVitals from '@/reportWebVitals';
import router from '@/router';

import sentry from './utils/sentry';

sentry.init();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
