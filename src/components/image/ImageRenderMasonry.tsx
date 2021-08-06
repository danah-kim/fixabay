import { memo, MutableRefObject, useCallback, useEffect, useMemo } from 'react';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Index,
  IndexRange,
  InfiniteLoader,
  Masonry,
  MasonryCellProps,
  OnScrollCallback,
  Size,
} from 'react-virtualized';
import ImageMeasurer, { ImageMeasurerProperties } from 'react-virtualized-image-measurer';
import { CARD } from 'constant';
import { Image } from 'types/api';
import ImageCard from './ImageCard';

interface ImageRenderMasonryProps {
  images: Image[];
  height: number;
  isRowLoaded: (params: Index) => boolean;
  loadMoreRows: (params: IndexRange) => Promise<unknown>;
  rowCount: number;
  onScroll: OnScrollCallback;
  masonryRef: MutableRefObject<Masonry | null>;
}

function ImageRenderMasonry({
  masonryRef,
  images,
  height,
  isRowLoaded,
  loadMoreRows,
  rowCount,
  onScroll,
}: ImageRenderMasonryProps) {
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

  useEffect(() => {
    // masonryRef.current?.clearCellPositions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onResize = useCallback(
    ({ width }: Size) => {
      cellPositioner?.reset({
        columnCount: Math.floor(width / CARD.width),
        columnWidth: CARD.width,
        spacer: CARD.gutterSize,
      });
      masonryRef.current?.recomputeCellPositions();
    },
    [cellPositioner, masonryRef]
  );

  const cellRenderer = useCallback(
    (itemsWithSizes: ImageMeasurerProperties['itemsWithSizes']) =>
      function cellRenderer({ index, key, parent, style }: MasonryCellProps) {
        const { item } = itemsWithSizes[index];

        return (
          <CellMeasurer cache={cellMeasurerCache} index={index} key={key} parent={parent}>
            <div style={style}>
              <ImageCard {...item} />
            </div>
          </CellMeasurer>
        );
      },
    [cellMeasurerCache]
  );

  return (
    <InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} rowCount={rowCount}>
      {({ onRowsRendered }) => (
        <AutoSizer disableHeight onResize={onResize}>
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
                  width={width}
                  height={height}
                  cellMeasurerCache={cellMeasurerCache}
                  cellPositioner={cellPositioner!}
                  cellCount={itemsWithSizes.length}
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
  );
}

export default memo(ImageRenderMasonry);
