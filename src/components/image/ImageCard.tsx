import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Lazyload from 'react-lazyload';
import { RenderComponentProps } from 'masonic/types/use-masonry';
import { Image } from 'types/api';
import routes from 'routes';

function ImageCard({ index, data: { id, webformatURL, webformatHeight } }: RenderComponentProps<Image>) {
  const location = useLocation();

  return (
    <Lazyload key={index} throttle={100} height={webformatHeight}>
      <div
        key={id}
        style={{
          width: '100%',
          minHeight: '100%',
          borderRadius: '1rem',
          background: 'rgba(0,0,0,.11)',
        }}
      >
        <Link
          key={id}
          to={{
            pathname: routes[
              location.pathname.includes(routes.reactQuery.path) ? 'reactQueryImageView' : 'swrImageView'
            ].path.replace(':id', `${id}`),
            state: { background: location },
          }}
        >
          <img
            src={webformatURL}
            alt={`${id}`}
            style={{
              width: '100%',
              display: 'block',
              borderRadius: '1rem',
            }}
          />
        </Link>
      </div>
    </Lazyload>
  );
}

export default memo(ImageCard);
