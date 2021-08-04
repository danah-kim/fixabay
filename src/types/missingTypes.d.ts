declare module 'react-virtualized-image-measurer' {
  import { SyntheticEvent, Key } from 'react';

  interface Size {
    width: number;
    height: number;
  }

  export interface ImageMeasurerProperties<T = any> {
    itemsWithSizes: {
      item: T;
      size: Size;
    }[];
    sizes: {
      string: Size;
    };
  }

  export interface ImageMeasurerProps<T = any> {
    items: T[];
    image: (item: T) => string;
    children: (props: ImageMeasurerProperties) => JSX.Element | null;
    defaultWidth: number;
    defaultHeight: number;
    onError?: (
      error?: (
        event?: SyntheticEvent<HTMLImageElement, Event>,
        item: T,
        src: string
      ) => { width: number; height: number } | void | null,
      item?: T,
      src?: string
    ) => void;
    timeout?: number;
    keyMapper?: (item: T, index: number) => Key;
  }

  export default function ImageMeasurer<T = any>(props: ImageMeasurerProps<T>): JSX.Element;
}
