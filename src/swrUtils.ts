import axios from 'axios';
import { SearchImagesParams } from 'types/api';
import { API_URL } from 'constant';

export const getKey = (pageIndex: number, params: Partial<SearchImagesParams>) => {
  return [`${API_URL}&page=${pageIndex + 1}`, params];
};

export const fetcher = (url: string, params: Partial<SearchImagesParams>) => {
  return axios
    .get(url, {
      params,
    })
    .then((res) => res.data);
};
