import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/components/shared/Layout';

import Home from '@/pages/Home';
import AboutUs from '@/pages/AboutUs';
import Plants from '@/pages/plants/Plants';
import { loader as plantsLoader } from '@components/PlantsList/PlantsList';
import { loader as plantDetailsLoader } from '@pages/plants/PlantDetails';
import { loader as articlesLoader } from '@components/ArticlesList/ArticlesList';
import { loader as articleLoader } from '@pages/blog/Article';
import { loader as dashboardPlantsLoader } from '@pages/dashboard/plants/PlantsTable';
import { loader as homePageLoader } from '@pages/Home';
import { loader as dashboardGeneralAnalyticsLoader } from '@pages/dashboard/DashboardHome';
import { loader as dashboardArticlesLoader } from '@pages/dashboard/articles/ArticlesTable';
import PlantEditor, {
  loader as plantLoader,
} from '@pages/dashboard/plants/PlantEditor';
import PlantDetails from '@/pages/plants/PlantDetails';
import UserManual from '@/pages/UserManual';
import Articles from '@/pages/blog/Articles';
import Article from '@/pages/blog/Article';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import { requireAuth } from '@/utils/require-auth';
import ErrorPage404 from '@/pages/error-pages/ErrorPage404';
import ErrorPage403 from '@/pages/error-pages/ErrorPage403';
import DashboardLayout from '@/components/shared/DashboardLayout';
// import ArticleEditor from '@/pages/dashboard/articles/ArticleEditor';
import DashboardHome from '@/pages/dashboard/DashboardHome';
import PlantsTable from '@/pages/dashboard/plants/PlantsTable';
import ArticleEditor from '@/pages/dashboard/articles/ArticleEditor';
import BookmarkedPlants from '@/pages/user-specific/BookmarkedPlants';
import { FeatureEntities } from '@/data/enums/feature-entities';
import BookmarkedArticles from '@/pages/user-specific/BookmarkedArticles';
import CreateNewPlant from '@/pages/dashboard/plants/CreateNewPlant';
import ArticlesTable from '@/pages/dashboard/articles/ArticlesTable';

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
        loader: homePageLoader,
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
            loader: async ({ request }) => plantsLoader({ request }),
          },
          {
            path: ':plantId',
            element: <PlantDetails />,
            loader: ({ params }) => {
              return plantDetailsLoader(params.plantId);
            },
            handle: {
              crumb: () => 'Детали',
            },
          },
          {
            path: 'my-bookmarked-plants',
            element: <BookmarkedPlants />,
            loader: async ({ request }) => {
              await requireAuth(request);
              return plantsLoader(
                { request },
                FeatureEntities.BookmarkedPlants
              );
            },
            handle: {
              crumb: () => 'Зачувани растенија',
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
            element: <Articles pageHeading="Блог" />,
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
          {
            path: 'my-bookmarked-articles',
            element: <BookmarkedArticles />,
            loader: async ({ request }) => {
              await requireAuth(request);
              return articlesLoader(
                { request },
                FeatureEntities.BookmarkedArticles
              );
            },
            handle: {
              crumb: () => 'Зачувани статии',
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
    element: <DashboardLayout />,
    path: 'dashboard',
    loader: async ({ request }) => {
      await requireAuth(request);
      return null;
    },
    children: [
      {
        index: true,
        element: <DashboardHome />,
        loader: async ({ request }) => {
          await requireAuth(request);
          return dashboardGeneralAnalyticsLoader();
        },
      },
      {
        path: 'plants',
        children: [
          {
            index: true,
            element: <PlantsTable />,
            loader: dashboardPlantsLoader,
          },
          {
            path: ':plantId',
            element: <PlantEditor />,
            loader: ({ params }) => {
              return plantLoader(params.plantId);
            },
          },
          {
            path: 'new',
            element: <CreateNewPlant />,
          },
        ],
      },
      {
        path: 'articles',
        children: [
          {
            index: true,
            element: <ArticlesTable />,
            loader: dashboardArticlesLoader,
          },
          {
            path: ':articleId',
            element: <ArticleEditor />,
          },
          {
            path: 'new',
            element: <ArticleEditor />,
          },
        ],
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
