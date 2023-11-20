import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/components/shared/Layout';

import Home from '@/pages/Home';
import AboutUs from '@/pages/AboutUs';
import Plants from '@/pages/plants/Plants';
import PlantDetails from '@/pages/plants/PlantDetails';
import UserManual from '@/pages/UserManual';
import Blog from '@/pages/blog/Blog';
import Article from '@/pages/blog/Article';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'plants',
        element: <Plants />,
      },
      {
        path: 'plants/:id',
        element: <PlantDetails />,
      },
      {
        path: 'blog',
        element: <Blog />,
      },
      {
        path: 'blog/:id',
        element: <Article />,
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
]);

export default router;
