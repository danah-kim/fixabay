import { useSWRInfinite } from 'swr';
import axios from 'axios';
import { Images, SearchImagesParams } from 'types/api';
import { API_URL } from 'constant';

const fetcher = async (url: string, params: Partial<SearchImagesParams>) => {
  const response = await axios.get(url, { params });

  return response.data;
};

function useSwrImages(params: Partial<SearchImagesParams>) {
  const { data, error, size, setSize, mutate } = useSWRInfinite<Images>(
    (pageIndex) => [`${API_URL}&page=${pageIndex + 1}`, params],
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
    size,
    setSize,
    refresh: mutate,
  };
}

export default useSwrImages;
