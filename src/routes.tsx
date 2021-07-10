import { lazy } from 'react';

const SwrPage = lazy(() => import('page/SwrPage'));
const ReactQueryPage = lazy(() => import('page/ReactQueryPage'));

const routes = {
  swr: {
    name: 'swr',
    path: '/swr',
    component: SwrPage,
  },
  reactQuery: {
    name: 'reactQuery',
    path: '/react-query',
    component: ReactQueryPage,
  },
};
export default routes;
