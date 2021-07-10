import routes from 'routes';
import ReactHelmet from 'components/ReactHelmet';

function SwrPage() {
  return (
    <div>
      <ReactHelmet title={routes.swr.name} description={routes.swr.name} canonical={routes.swr.path} />
      SWR
    </div>
  );
}

export default SwrPage;
