import { memo, useCallback, useMemo, useRef } from 'react';
import ImageMeasurer, { ImageMeasurerProperties } from 'react-virtualized-image-measurer';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Index,
  InfiniteLoader,
  Masonry,
  MasonryCellProps,
  WindowScroller,
  Size,
  OnScrollCallback,
} from 'react-virtualized';
import { useRecoilState } from 'recoil';
import shadowToggleState from 'recoil/atom';
import { Image } from 'types/api';
import { CARD } from 'constant';
import ImageCard from './ImageCard';

function ImageList({
  images,
  hasMore,
  fetchMoreData,
}: {
  images: Image[];
  hasMore: boolean;
  fetchMoreData: () => void;
}) {
  const [shadowToggle, setShadowToggle] = useRecoilState(shadowToggleState);
  const masonryRef = useRef<Masonry | null>(null);

  const cellMeasurerCache = useMemo(
    () =>
      new CellMeasurerCache({
        defaultHeight: CARD.height,
        defaultWidth: CARD.width,
        fixedWidth: true,
      }),
    []
  );
  const cellPositioner = useMemo(
    () =>
      createMasonryCellPositioner({
        cellMeasurerCache,
        columnCount: 0,
        columnWidth: CARD.width,
        spacer: CARD.height,
      }),
    [cellMeasurerCache]
  );

  const isRowLoaded = useCallback(({ index }: Index) => !!images[index], [images]);

  const loadMoreRows = useCallback(async () => {
    if (hasMore) fetchMoreData();
  }, [fetchMoreData, hasMore]);

  const onResize = useCallback(
    ({ width }: Size) => {
      cellPositioner.reset({
        columnCount: Math.floor(width / CARD.width),
        columnWidth: CARD.width,
        spacer: CARD.gutterSize,
      });
      masonryRef.current?.recomputeCellPositions();
    },
    [cellPositioner]
  );

  const cellRenderer = useCallback(
    (itemsWithSizes: ImageMeasurerProperties['itemsWithSizes']) =>
      function cellRenderer({ index, key, parent, style }: MasonryCellProps) {
        const { item } = itemsWithSizes[index];

        return (
          <CellMeasurer cache={cellMeasurerCache} index={index} key={key} parent={parent}>
            <div style={{ ...style }}>
              <ImageCard {...item} cardHeight={style?.height} />
            </div>
          </CellMeasurer>
        );
      },
    [cellMeasurerCache]
  );

  const onScroll: OnScrollCallback = useCallback(
    ({ scrollTop }) => {
      if (shadowToggle !== !!scrollTop) setShadowToggle(!shadowToggle);
    },
    [setShadowToggle, shadowToggle]
  );

  return (
    <WindowScroller>
      {({ height, scrollTop }) => (
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          rowCount={hasMore ? images.length + 1 : images.length}
        >
          {({ onRowsRendered }) => (
            <AutoSizer disableHeight height={height} scrollTop={scrollTop} onResize={onResize}>
              {({ width }) => (
                <ImageMeasurer
                  items={images}
                  image={(item) => item.webformatURL}
                  defaultHeight={CARD.height}
                  defaultWidth={CARD.width}
                >
                  {({ itemsWithSizes }) => (
                    <Masonry
                      ref={masonryRef}
                      autoHeight={false}
                      height={height}
                      width={width}
                      cellCount={itemsWithSizes.length}
                      cellMeasurerCache={cellMeasurerCache}
                      cellPositioner={cellPositioner}
                      cellRenderer={cellRenderer(itemsWithSizes)}
                      onCellsRendered={onRowsRendered}
                      onScroll={onScroll}
                    />
                  )}
                </ImageMeasurer>
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      )}
    </WindowScroller>
  );
}

export default memo(ImageList);
