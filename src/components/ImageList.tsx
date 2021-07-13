import { memo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Masonry } from 'masonic';
import { Image } from 'types/api';
import Card from './Card';
import 'styles/masonry.css';

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
    <div
      className="container-fluid"
      style={{
        minHeight: '100vh',
        margin: '163px auto',
      }}
    >
      {images.length ? (
        <InfiniteScroll
          dataLength={images.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>Make something awesome :)</p>}
        >
          <Masonry items={images} columnGutter={25} columnWidth={400} overscanBy={5} render={Card} />
        </InfiniteScroll>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
}

export default memo(ImageList);
