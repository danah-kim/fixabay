import { Dispatch, SetStateAction } from 'react';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import { API_URL } from 'constant';
import { Images, SearchImagesParams } from 'types/api';

interface fetchImagesParams {
  pageIndex: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
  params: Partial<SearchImagesParams>;
}

const fetchImages = async ({ pageIndex, setPageIndex, params }: fetchImagesParams) => {
  setPageIndex(pageIndex + 1);

  const response = await axios.get(`${API_URL}&page=${pageIndex + 1}`, { params });

  return response.data;
};

interface useReactQueryImagesProps {
  pageIndex: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
  params: Partial<SearchImagesParams>;
}

function useReactQueryImages({ pageIndex, setPageIndex, params }: useReactQueryImagesProps) {
  return useInfiniteQuery<Images, unknown, Images, (string | Partial<SearchImagesParams>)[]>(
    ['images', params],
    () => fetchImages({ pageIndex, setPageIndex, params }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => (lastPage.total === lastPage.hits.length ? false : pageIndex),
    }
  );
}

export default useReactQueryImages;
