import { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import routes from 'routes';
import NoMatch from 'components/NoMatch';

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/">
            {Object.entries(routes).map(([key, { path }]) => (
              <li key={key}>
                <Link to={path}>{key}</Link>
              </li>
            ))}
          </Route>
          {Object.entries(routes).map(([key, { path, component: Component }]) => (
            <Route key={key} path={path} component={Component} />
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
