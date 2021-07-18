import { useQuery } from 'react-query';
import axios from 'axios';
import { API_URL } from 'constant';
import { Image, Images } from 'types/api';

const getImageById = async (id: string) => {
  const { data } = await axios.get<Images>(API_URL, {
    params: {
      id,
    },
  });

  // 리스트 API만 있어, 아이템 API로 이용하기위해 고정
  return data.hits[0];
};

function useReactQueryImage(id: string) {
  return useQuery<Image>(['image', id], () => getImageById(id));
}

export default useReactQueryImage;
