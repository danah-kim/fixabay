import { memo } from 'react';
import Lazyload from 'react-lazyload';
import { RenderComponentProps } from 'masonic/types/use-masonry';
import { Image } from 'types/api';

function Card({ index, data: { id, webformatURL, webformatHeight } }: RenderComponentProps<Image>) {
  return (
    <Lazyload key={index} throttle={200} height={webformatHeight}>
      <div
        key={id}
        style={{
          width: '100%',
          minHeight: '100%',
          borderRadius: '1rem',
          background: 'rgba(0,0,0,.11)',
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
      </div>
    </Lazyload>
  );
}

export default memo(Card);
