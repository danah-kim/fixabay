import { useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Image, Images } from 'types/api';

function ImageList({
  image,
  total,
  size,
  setSize,
}: {
  image: Image[];
  total: number;
  size: number;
  setSize: (size: number | ((size: number) => number)) => Promise<Images[] | undefined>;
}) {
  const fetchMoreData = useCallback(async () => {
    await setSize(size + 1);
  }, [setSize, size]);

  return image.length ? (
    <InfiniteScroll
      dataLength={image.length}
      next={fetchMoreData}
      hasMore={total !== image.length}
      loader={<h4>Loading...</h4>}
      endMessage={<p>Make something awesome :)</p>}
    >
      {image.map(({ id, previewURL }) => (
        <div key={id}>
          <img src={previewURL} alt={`${id}`} />
        </div>
      ))}
    </InfiniteScroll>
  ) : (
    <p>No data</p>
  );
}

export default ImageList;
