import { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import routes, { Routes } from 'routes';
import NoMatch from 'components/NoMatch';

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/">
            {Object.entries(Routes).map(([key, value]) => (
              <li key={key}>
                <Link to={value}>{key}</Link>
              </li>
            ))}
          </Route>
          {routes.map(({ path, component: Component }) => (
            <Route key={path} path={path} component={Component} />
          ))}
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
