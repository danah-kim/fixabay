import Lazyload from 'react-lazyload';
import { Image } from 'types/api';

function Card({ id, webformatURL, webformatHeight }: Image) {
  return (
    <Lazyload throttle={200} height={webformatHeight}>
      <div
        key={id}
        style={{
          width: '100%',
        }}
      >
        <img
          src={webformatURL}
          alt={`${id}`}
          style={{
            width: '100%',
          }}
        />
      </div>
    </Lazyload>
  );
}

export default Card;
