import { createBrowserRouter } from 'react-router-dom';

import RootNavigation from './RootNavigation';

const router = createBrowserRouter([
  {
    path: '*',
    Component: RootNavigation,
  },
]);

export default router;
