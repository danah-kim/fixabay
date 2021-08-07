import { memo, useCallback } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ListRowProps, IndexRange } from 'react-virtualized';
import ImageMeasurer, { ImageMeasurerProperties } from 'react-virtualized-image-measurer';
import { CARD } from 'constant';
import { Image } from 'types/api';
import ImageCard from './ImageCard';

interface ImageListRenderProps {
  images: Image[];
  registerChild: (registeredChild: unknown) => void;
  onRowsRendered: (params: IndexRange) => void;
  height: number;
  isScrolling: boolean;
  scrollTop: number;
  onChildScroll: (params: { scrollTop: number }) => void;
}

function ImageRenderList({
  images,
  registerChild,
  onRowsRendered,
  height,
  isScrolling,
  scrollTop,
  onChildScroll,
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
    <AutoSizer disableHeight onResize={onResize}>
      {({ width }) => (
        <ImageMeasurer
          items={images}
          image={(item) => item.webformatURL}
          defaultHeight={CARD.height}
          defaultWidth={CARD.width}
        >
          {({ itemsWithSizes }) => (
            <List
              ref={registerChild}
              onRowsRendered={onRowsRendered}
              width={width}
              autoHeight
              height={height}
              deferredMeasurementCache={cellMeasurerCache}
              rowHeight={cellMeasurerCache.rowHeight}
              rowCount={itemsWithSizes.length}
              rowRenderer={rowRenderer(itemsWithSizes)}
              isScrolling={isScrolling}
              scrollTop={scrollTop}
              onScroll={onChildScroll}
            />
          )}
        </ImageMeasurer>
      )}
    </AutoSizer>
  );
}

export default memo(ImageRenderList);
