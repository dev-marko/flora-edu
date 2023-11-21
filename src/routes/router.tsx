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
