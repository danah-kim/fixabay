import useSWR from 'swr';
import axios from 'axios';
import { API_URL } from 'constant';
import { Image, Images } from 'types/api';

const fetcher = async (url: string, id: string) => {
  const { data } = await axios.get<Images>(url, {
    params: {
      id,
    },
  });

  // 리스트 API만 있어, 아이템 API로 이용하기위해 고정
  return data.hits[0];
};

function useSwrImage(id: string) {
  const { data, error } = useSWR<Image>([API_URL, id], fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
  };
}

export default useSwrImage;
