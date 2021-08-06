import { memo, ReactNode, useCallback } from 'react';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  Index,
  InfiniteLoader,
  OnScrollCallback,
  List,
  ListRowProps,
  IndexRange,
} from 'react-virtualized';
import ImageMeasurer, { ImageMeasurerProperties } from 'react-virtualized-image-measurer';
import { CARD } from 'constant';
import { Image } from 'types/api';
import ImageCard from './ImageCard';

interface ImageListRenderProps {
  images: Image[];
  height: number;
  isRowLoaded: (params: Index) => boolean;
  loadMoreRows: (params: IndexRange) => Promise<unknown>;
  rowCount: number;
  registerChild: (element?: ReactNode) => void;
  onScroll: OnScrollCallback;
}

function ImageRenderList({
  images,
  height,
  isRowLoaded,
  loadMoreRows,
  rowCount,
  registerChild,
  onScroll,
}: ImageListRenderProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cellMeasurerCache = new CellMeasurerCache({
    defaultHeight: CARD.height,
    defaultWidth: CARD.width,
    fixedWidth: true,
  });

  const onResize = useCallback(() => {
    cellMeasurerCache.clearAll();
  }, [cellMeasurerCache]);

  const rowRenderer = useCallback(
    (itemsWithSizes: ImageMeasurerProperties['itemsWithSizes']) =>
      function rowRenderer({ index, key, parent, style }: ListRowProps) {
        const { item } = itemsWithSizes[index];

        return (
          <CellMeasurer cache={cellMeasurerCache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
            {({ registerChild }) => (
              <div
                ref={(ref) => {
                  ref && registerChild && registerChild(ref);
                }}
                style={style}
              >
                <ImageCard {...item} />
              </div>
            )}
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
                <div ref={registerChild}>
                  <List
                    deferredMeasurementCache={cellMeasurerCache}
                    width={width}
                    height={height}
                    rowCount={itemsWithSizes.length}
                    rowHeight={cellMeasurerCache.rowHeight}
                    rowRenderer={rowRenderer(itemsWithSizes)}
                    onRowsRendered={onRowsRendered}
                    onScroll={onScroll}
                  />
                </div>
              )}
            </ImageMeasurer>
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
}

export default memo(ImageRenderList);
