import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/components/shared/Layout';

import Home from '@/pages/Home';
import AboutUs from '@/pages/AboutUs';
import Plants from '@/pages/plants/Plants';
import PlantDetails from '@/pages/plants/PlantDetails';
import UserManual from '@/pages/UserManual';
import Blog from '@/pages/blog/Blog';
import Article from '@/pages/blog/Article';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import { requireAuth } from '@/utils/require-auth';
import ErrorPage404 from '@/pages/error-pages/ErrorPage404';
import ErrorPage403 from '@/pages/error-pages/ErrorPage403';
import { useState } from 'react';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'plants',
        children: [
          {
            index: true,
            element: <Plants />,
          },
          {
            path: ':id',
            element: <PlantDetails />,
          },
        ],
      },
      {
        path: 'blog',
        children: [
          {
            index: true,
            element: <Blog />,
          },
          {
            path: ':id',
            element: <Article />,
          },
        ],
      },
      {
        path: 'about-us',
        element: <AboutUs />,
      },
      {
        path: 'user-manual',
        element: <UserManual />,
        loader: async ({ request }) => {
          //! Temporary, remove in the future
          await requireAuth(request);
          return null;
        },
      },
      {
        path: '/403-forbidden',
        element: <ErrorPage403 />,
      },
      {
        path: '*',
        element: <ErrorPage404 />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
]);

export default router;
