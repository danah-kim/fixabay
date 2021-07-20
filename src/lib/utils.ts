import { ImageType } from 'types/api';

export function getImageType(pathname: string) {
  const str = pathname.replace('/', '').slice(0, -1);

  return str.length ? ImageType[str as ImageType] : ImageType.all;
}
