import routes from 'routes';
import ReactHelmet from 'components/ReactHelmet';

function ReactQueryPage() {
  return (
    <div>
      <ReactHelmet
        title={routes.reactQuery.name}
        description={routes.reactQuery.name}
        canonical={routes.reactQuery.path}
      />
      ReactQuery
    </div>
  );
}

export default ReactQueryPage;
