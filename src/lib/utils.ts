import { ImageType } from 'types/api';

export function getImageType(pathname: string) {
  const str = pathname.replace('/', '').slice(0, -1);

  return str.length ? ImageType[str as ImageType] : ImageType.all;
}

export async function downloadImage(name: string, url: string) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = `${name}${url.substring(url.lastIndexOf('.'))}`;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => document.body.removeChild(link), 1000);
  } catch (error) {
    console.error(error);
  }
}
