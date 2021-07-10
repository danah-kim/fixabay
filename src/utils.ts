import axios from 'axios';
import { SearchImagesParams } from './api';
import { API_URL } from './constant';

export function getKey(pageIndex: number, params: Partial<SearchImagesParams>) {
  return [`${API_URL}&page=${pageIndex + 1}`, params];
}

export function fetcher(url: string, params: Partial<SearchImagesParams>) {
  return axios
    .get(url, {
      params,
    })
    .then((res) => res.data);
}
