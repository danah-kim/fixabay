import { memo, useCallback, useRef } from 'react';
import { Index, Masonry, WindowScroller, InfiniteLoader, WindowScrollerProps } from 'react-virtualized';
import { useRecoilState } from 'recoil';
import isMobile from 'ismobilejs';
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
  const isMobileDevice = isMobile(window.navigator).phone || isMobile(window.navigator).tablet;

  const isRowLoaded = useCallback(({ index }: Index) => !!images[index], [images]);

  const loadMoreRows = useCallback(async () => {
    if (hasMore) fetchMoreData();
  }, [fetchMoreData, hasMore]);

  const onScroll: WindowScrollerProps['onScroll'] = useCallback(
    ({ scrollTop }) => {
      if (shadowToggle !== !!scrollTop) setShadowToggle(!shadowToggle);
    },
    [setShadowToggle, shadowToggle]
  );

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={hasMore ? images.length + 1 : images.length}
    >
      {({ registerChild, onRowsRendered }) => (
        <WindowScroller onScroll={onScroll}>
          {({ width, height, isScrolling, scrollTop, onChildScroll }) =>
            width > 505 ? (
              <RenderMasonry
                masonryRef={masonryRef}
                images={images}
                registerChild={registerChild}
                onRowsRendered={onRowsRendered}
                height={height}
                isScrolling={isScrolling}
                scrollTop={scrollTop}
                onChildScroll={onChildScroll}
              />
            ) : (
              <RenderList
                images={images}
                registerChild={registerChild}
                onRowsRendered={onRowsRendered}
                height={height}
                isScrolling={isScrolling}
                scrollTop={scrollTop}
                onChildScroll={onChildScroll}
              />
            )
          }
        </WindowScroller>
      )}
    </InfiniteLoader>
  );
}

export default memo(ImageList);
