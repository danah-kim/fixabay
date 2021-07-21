import { memo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Lazyload from 'react-lazyload';
import { RenderComponentProps } from 'masonic/types/use-masonry';
import { useToggle } from 'react-use';
import routes from 'routes';
import { Image } from 'types/api';
import DownloadButton from 'components/common/DownloadButton';

function ImageCard({
  index,
  data: { id, user, webformatURL, webformatHeight, largeImageURL, likes, views, tags },
}: RenderComponentProps<Image>) {
  const location = useLocation();
  const [isHover, toggle] = useToggle(false);

  const handleHover = useCallback(() => {
    toggle(!isHover);
  }, [isHover, toggle]);

  return (
    <>
      <Lazyload key={index} throttle={100} height={webformatHeight}>
        <div
          key={id}
          style={{
            width: '100%',
            minHeight: '100%',
            borderRadius: '1rem',
            background: 'rgba(0,0,0,.11)',
          }}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
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
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              visibility: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 20,
                position: 'absolute',
                inset: 0,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  visibility: isHover ? 'visible' : 'hidden',
                  opacity: isHover ? 1 : 0,
                  transition: 'opacity .1s ease-in-out,visibility .1s ease-in-out',
                }}
              >
                <div>{user}</div>
                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  <p>likes: {likes}</p>
                  <p>views: {views}</p>
                </div>
              </div>
              <div
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  visibility: isHover ? 'visible' : 'hidden',
                  opacity: isHover ? 1 : 0,
                  transition: 'opacity .1s ease-in-out,visibility .1s ease-in-out',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  {tags.split(',').map((tag) => (
                    <p key={tag} style={{ paddingRight: 5 }}>
                      {tag.trim()}
                    </p>
                  ))}
                </div>
                <div
                  style={{
                    marginLeft: 'auto',
                  }}
                >
                  <DownloadButton name={`${id}`} url={largeImageURL} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Lazyload>
    </>
  );
}

export default memo(ImageCard);
