import { Suspense } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { Location } from 'history';
import { AxiosError } from 'axios';
import { SWRConfig, cache, mutate } from 'swr';
import SWRDevtools from '@jjordy/swr-devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
// import styled from 'styled-components/macro';
// import tw from 'twin.macro';
import routes, { reactQueryRoutes, swrRoutes } from 'routes';
import NotFound from 'components/error/NotFound';
import HashLoader from 'components/common/HashLoader';

// const Button = styled.button<{ primary?: boolean }>`
//   ${tw`py-2 px-4 m-4 text-base border-2 border-solid border-green-500 rounded-xl`};
//   ${({ primary }) =>
//     primary
//       ? tw`bg-green-500 text-white hover:bg-white hover:text-green-500`
//       : tw`bg-white text-green-500 hover:bg-green-500 hover:text-white`};
// `;

export interface LocationState {
  background?: Location<LocationState>;
}

function App() {
  const location = useLocation<LocationState>();
  const background = location.state?.background;

  return (
    <Suspense fallback={<HashLoader />}>
      <Switch>
        <Route exact path="/">
          <Redirect to={routes.reactQuery.path} />
          {/* {Object.entries(routes)
            .filter(([_, { isPage, isNave }]) => isPage && !isNave)
            .map(([key, { path }]) => (
              <Button key={key} primary={key.includes('react')}>
                <Link to={path}>{key}</Link>
              </Button>
            ))} */}
        </Route>
        <Route path={swrRoutes.swr.path}>
          <SwrApp background={background || location} />
        </Route>
        <Route path={reactQueryRoutes.reactQuery.path}>
          <ReactQueryApp background={background || location} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Suspense>
  );
}

interface AppProps {
  background: Location<LocationState>;
}

function SwrApp({ background }: AppProps) {
  return (
    <>
      <SWRConfig
        value={{
          onError: (error: AxiosError) => {
            if (error.response) {
              if (error.response.status !== 400 && error.response.status !== 409 && error.response.status !== 404) {
                console.error('요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다');
                console.error(error.response);
              }
            } else if (error.request) {
              console.error('요청이 이루어 졌으나 응답을 받지 못했습니다.');
              console.error(error.request);
            } else {
              console.error('오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.');
              console.error('Error', error.message);
            }
          },
        }}
      >
        <Switch location={background}>
          {Object.entries(swrRoutes)
            .filter(([_, { isPage }]) => isPage)
            .map(([key, { path, component }]) => (
              <Route key={key} path={path} component={component} />
            ))}
          <Route>
            <NotFound />
          </Route>
        </Switch>
        {background &&
          Object.entries(swrRoutes)
            .filter(([_, { isPage }]) => !isPage)
            .map(([key, { path, component: Component }]) => (
              <Route key={key} path={path}>
                <Component />
              </Route>
            ))}
      </SWRConfig>
      <SWRDevtools cache={cache} mutate={mutate} />
    </>
  );
}

const queryClient = new QueryClient();

function ReactQueryApp({ background }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch location={background}>
        {Object.entries(reactQueryRoutes)
          .filter(([_, { isPage }]) => isPage)
          .map(([key, { path, component }]) => (
            <Route key={key} path={path} component={component} />
          ))}
        <Route>
          <NotFound />
        </Route>
      </Switch>
      {background &&
        Object.entries(reactQueryRoutes)
          .filter(([_, { isPage }]) => !isPage)
          .map(([key, { path, component: Component }]) => (
            <Route key={key} path={path}>
              <Component />
            </Route>
          ))}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
