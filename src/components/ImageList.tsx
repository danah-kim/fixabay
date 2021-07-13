import InfiniteScroll from 'react-infinite-scroll-component';
import { Image } from 'types/api';
import Card from './Card';

function ImageList({
  images,
  hasMore,
  fetchMoreData,
}: {
  images: Image[];
  hasMore: boolean;
  fetchMoreData: () => void;
}) {
  return (
    <div>
      {images.length ? (
        <InfiniteScroll
          dataLength={images.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>Make something awesome :)</p>}
        >
          {images.map((image) => (
            <Card key={image.id} {...image} />
          ))}
        </InfiniteScroll>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
}

export default ImageList;
