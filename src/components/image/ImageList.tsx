import { memo, useCallback, useRef } from 'react';
import { Index, Masonry, WindowScroller, OnScrollCallback, IndexRange } from 'react-virtualized';
import { useRecoilState } from 'recoil';
import shadowToggleState from 'lib/recoil/shadowToggle';
import { Image } from 'types/api';
import RenderMasonry from './ImageRenderMasonry';
import RenderList from './ImageRenderList';

interface ImageListProps {
  images: Image[];
  hasMore: boolean;
  fetchMoreData: () => void;
}

function ImageList({ images, hasMore, fetchMoreData }: ImageListProps) {
  const [shadowToggle, setShadowToggle] = useRecoilState(shadowToggleState);
  const masonryRef = useRef<Masonry | null>(null);

  const isRowLoaded = useCallback(({ index }: Index) => !!images[index], [images]);

  const loadMoreRows = useCallback(async () => {
    if (hasMore) fetchMoreData();
  }, [fetchMoreData, hasMore]);

  const onScroll: OnScrollCallback = useCallback(
    ({ scrollTop }) => {
      if (shadowToggle !== !!scrollTop) setShadowToggle(!shadowToggle);
    },
    [setShadowToggle, shadowToggle]
  );

  return (
    <WindowScroller>
      {({ width, height }) => {
        return width > 505 ? (
          <RenderMasonry
            images={images}
            height={height}
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={hasMore ? images.length + 1 : images.length}
            onScroll={onScroll}
            masonryRef={masonryRef}
          />
        ) : (
          <RenderList
            images={images}
            height={height}
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={hasMore ? images.length + 1 : images.length}
            onScroll={onScroll}
          />
        );
      }}
    </WindowScroller>
  );
}

export default memo(ImageList);
