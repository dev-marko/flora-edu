import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/components/shared/Layout';

import Home from '@/pages/Home';
import AboutUs from '@/pages/AboutUs';
import Plants from '@/pages/plants/Plants';
import { loader as plantsLoader } from '@components/PlantsList/PlantsList';
import { loader as plantDetailsLoader } from '@pages/plants/PlantDetails';
import { loader as articlesLoader } from '@components/ArticlesList/ArticlesList';
import { loader as articleLoader } from '@pages/blog/Article';
import PlantDetails from '@/pages/plants/PlantDetails';
import UserManual from '@/pages/UserManual';
import Blog from '@/pages/blog/Blog';
import Article from '@/pages/blog/Article';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import { requireAuth } from '@/utils/require-auth';
import ErrorPage404 from '@/pages/error-pages/ErrorPage404';
import ErrorPage403 from '@/pages/error-pages/ErrorPage403';

const router = createBrowserRouter([
  {
    element: <Layout />,
    handle: {
      crumb: () => 'Дома',
    },
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'plants',
        handle: {
          crumb: () => 'Растенија',
        },
        children: [
          {
            index: true,
            element: <Plants />,
            loader: plantsLoader,
          },
          {
            id: 'plantDetails',
            path: ':plantId',
            element: <PlantDetails />,
            loader: ({ params }) => {
              return plantDetailsLoader(params.plantId);
            },
            handle: {
              crumb: () => 'Детали',
            },
          },
        ],
      },
      {
        path: 'blog',
        handle: {
          crumb: () => 'Блог',
        },
        children: [
          {
            index: true,
            element: <Blog />,
            loader: articlesLoader,
          },
          {
            path: ':articleId',
            element: <Article />,
            loader: ({ params }) => {
              return articleLoader(params.articleId);
            },
            handle: {
              crumb: () => 'Статија',
            },
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
