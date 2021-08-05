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

export async function copyTextToClipboard(text: string) {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);

      return true;
    } catch (error) {
      console.error('Could not copy text: ', error);
    }
  } else {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      return true;
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
  }

  return false;
}

export function formatNumberWithCommas(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatNumberWithK(num: number) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    // { value: 1e6, symbol: 'M' },
    // { value: 1e9, symbol: 'G' },
    // { value: 1e12, symbol: 'T' },
    // { value: 1e15, symbol: 'P' },
    // { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let item = lookup
    .slice()
    .reverse()
    .find((item) => num >= item.value);
  const calValue = item ? (num / item.value).toFixed(0) : '0';

  // return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
  return !item
    ? calValue
    : (calValue.length > 3 ? (+calValue / 1000).toFixed(2) : calValue).replace(rx, '$1') + item.symbol;
}
