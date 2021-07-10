import { lazy } from 'react';

const SwrPage = lazy(() => import('pages/SwrPage'));
const ReactQueryPage = lazy(() => import('pages/ReactQueryPage'));

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
