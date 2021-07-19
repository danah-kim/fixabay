import { Suspense } from 'react';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import routes, { reactQueryRoutes, swrRoutes } from 'routes';
import NoMatch from 'components/NoMatch';
import { Location } from 'history';
import { AxiosError } from 'axios';
import { SWRConfig } from 'swr';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'styles/masonry.css';

export interface LocationState {
  background?: Location<LocationState>;
}

function App() {
  const location = useLocation<LocationState>();
  const background = location.state?.background;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/">
          {Object.entries(routes)
            .filter(([_, { isPage }]) => isPage)
            .map(([key, { path }]) => (
              <li key={key}>
                <Link to={path}>{key}</Link>
              </li>
            ))}
        </Route>
        <Route path={swrRoutes.swr.path}>
          <SwrApp background={background || location} />
        </Route>
        <Route path={reactQueryRoutes.reactQuery.path}>
          <ReactQueryApp background={background || location} />
        </Route>
        <Route>
          <NoMatch />
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
          <NoMatch />
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
          <NoMatch />
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
    </QueryClientProvider>
  );
}

export default App;
