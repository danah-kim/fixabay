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
    isNave: false,
    component: SwrPage,
  },
  swrPhotos: {
    name: 'photos',
    path: '/swr/photos',
    isPage: true,
    isNave: true,
    component: SwrPage,
  },
  swrIllustrations: {
    name: 'illustrations',
    path: '/swr/illustrations',
    isPage: true,
    isNave: true,
    component: SwrPage,
  },
  swrVectors: {
    name: 'vectors',
    path: '/swr/vectors',
    isPage: true,
    isNave: true,
    component: SwrPage,
  },
  swrImageView: {
    name: 'imageView',
    path: '/swr/images/:id',
    isPage: false,
    isNave: false,
    component: SwrDetailView,
  },
};

export const reactQueryRoutes = {
  reactQuery: {
    name: 'reactQuery',
    path: '/react-query',
    isPage: true,
    isNave: false,
    component: ReactQueryPage,
  },
  reactQueryPhotos: {
    name: 'photos',
    path: '/react-query/photos',
    isPage: true,
    isNave: true,
    component: ReactQueryPage,
  },
  reactQueryIllustrations: {
    name: 'illustrations',
    path: '/react-query/illustrations',
    isPage: true,
    isNave: true,
    component: ReactQueryPage,
  },
  reactQueryVectors: {
    name: 'vectors',
    path: '/react-query/vectors',
    isPage: true,
    isNave: true,
    component: ReactQueryPage,
  },
  reactQueryImageView: {
    name: 'imageView',
    path: '/react-query/images/:id',
    isPage: false,
    isNave: false,
    component: ReactQueryDetailView,
  },
};

export default { ...swrRoutes, ...reactQueryRoutes };
