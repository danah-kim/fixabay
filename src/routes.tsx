import { lazy } from 'react';

const SwrPage = lazy(() => import('pages/SwrPage'));
const SwrDetailView = lazy(() => import('pages/SwrDetailView'));
const ReactQueryPage = lazy(() => import('pages/ReactQueryPage'));
const ReactQueryDetailView = lazy(() => import('pages/ReactQueryDetailView'));

export const swrRoutes = {
  swr: {
    name: 'swr',
    path: '/swr',
    isPage: true,
    component: SwrPage,
  },
  swrImageView: {
    name: 'swrImageView',
    path: '/swr/images/:id',
    isPage: false,
    component: SwrDetailView,
  },
};

export const reactQueryRoutes = {
  reactQuery: {
    name: 'reactQuery',
    path: '/react-query',
    isPage: true,
    component: ReactQueryPage,
  },
  reactQueryImageView: {
    name: 'reactQueryImageView',
    path: '/react-query/images/:id',
    isPage: false,
    component: ReactQueryDetailView,
  },
};

export default { ...swrRoutes, ...reactQueryRoutes };
