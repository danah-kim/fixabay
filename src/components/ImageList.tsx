import InfiniteScroll from 'react-infinite-scroll-component';
import { Image } from 'types/api';

function ImageList({ image, hasMore, fetchMoreData }: { image: Image[]; hasMore: boolean; fetchMoreData: () => void }) {
  return image.length ? (
    <div>
      <InfiniteScroll
        dataLength={image.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>Make something awesome :)</p>}
      >
        {image.map(({ id, previewURL }) => (
          <div key={id}>
            <img src={previewURL} alt={`${id}`} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  ) : (
    <p>No data</p>
  );
}

export default ImageList;
