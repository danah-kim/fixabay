import { memo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useToggle } from 'react-use';
import { Property } from 'csstype';
import routes from 'routes';
import { Image } from 'types/api';
import DownloadButton from 'components/common/DownloadButton';

interface ImageCardProps extends Image {
  cardHeight: Property.Height<string | number> | undefined;
}

function ImageCard({ id, user, webformatURL, largeImageURL, likes, views, tags, cardHeight = 0 }: ImageCardProps) {
  const location = useLocation();
  const [isHover, toggle] = useToggle(false);

  const handleHover = useCallback(() => {
    toggle(!isHover);
  }, [isHover, toggle]);

  return (
    <div
      style={{
        paddingBottom: 16,
        paddingLeft: 8,
        paddingRight: 8,
      }}
    >
      <div
        key={id}
        style={{
          height: +cardHeight - 16,
          borderRadius: 16,
          background: 'rgb(212, 224, 226)',
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
              borderRadius: 16,
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
    </div>
  );
}

export default memo(ImageCard);
