import { lazy } from 'react';

const SwrPage = lazy(() => import('page/SwrPage'));
const ReactQueryPage = lazy(() => import('page/ReactQueryPage'));

export const Routes = {
  swr: '/swr',
  reactQuery: '/react-query',
};

const routes = [
  {
    path: Routes.swr,
    component: SwrPage,
  },
  {
    path: Routes.reactQuery,
    component: ReactQueryPage,
  },
];

export default routes;
