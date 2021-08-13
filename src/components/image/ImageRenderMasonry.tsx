import { memo, MutableRefObject, useCallback, useMemo } from 'react';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  IndexRange,
  Masonry,
  MasonryCellProps,
  Size,
} from 'react-virtualized';
import ImageMeasurer, { ImageMeasurerProperties } from 'react-virtualized-image-measurer';
import { CARD } from 'constant';
import { Image } from 'types/api';
import ImageCard from './ImageCard';
import { styled } from 'twin.macro';

const ImageCardConainer = styled.div`
  @media (max-width: 505px) {
    right: 0;
    margin: 0 auto;
  }
`;

interface ImageRenderMasonryProps {
  masonryRef: MutableRefObject<Masonry | null>;
  images: Image[];
  registerChild: (registeredChild: unknown) => void;
  onRowsRendered: (params: IndexRange) => void;
  height: number;
  isScrolling: boolean;
  scrollTop: number;
  onChildScroll: (params: { scrollTop: number }) => void;
}

function ImageRenderMasonry({
  masonryRef,
  images,
  registerChild,
  onRowsRendered,
  onChildScroll,
  height,
  isScrolling,
  scrollTop,
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
            <ImageCardConainer style={style}>
              <ImageCard {...item} />
            </ImageCardConainer>
          </CellMeasurer>
        );
      },
    [cellMeasurerCache]
  );

  return (
    <AutoSizer disableHeight onResize={onResize} height={height} scrollTop={scrollTop}>
      {({ width }) => (
        <ImageMeasurer
          items={images}
          image={(item) => item.webformatURL}
          defaultHeight={CARD.height}
          defaultWidth={CARD.width}
        >
          {({ itemsWithSizes }) => (
            <Masonry
              ref={(ref) => {
                if (ref) {
                  masonryRef.current = ref;
                  registerChild(ref);
                }
              }}
              onCellsRendered={onRowsRendered}
              width={width}
              autoHeight
              height={height}
              cellMeasurerCache={cellMeasurerCache}
              cellPositioner={cellPositioner!}
              cellCount={itemsWithSizes.length}
              cellRenderer={cellRenderer(itemsWithSizes)}
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

export default memo(ImageRenderMasonry);
