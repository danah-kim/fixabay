import { memo } from 'react';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import { RiEmotionSadLine } from 'react-icons/ri';
import { useRecoilValue } from 'recoil';
import searchState from 'recoil/search';

const Container = styled.div`
  ${tw`w-full flex flex-col justify-items-center items-center py-12 mt-14`}
`;
const Icon = styled.div`
  ${tw`w-28 h-28 rounded-full mx-auto mb-6`}

  svg {
    ${tw`text-green-500 w-full h-full`};
  }
`;
const Text = tw.p`text-2xl font-semibold px-8 text-center`;
const Highlight = tw.span`text-green-500`;

function NotFound() {
  const search = useRecoilValue(searchState);
  return (
    <Container>
      <Icon>
        <RiEmotionSadLine />
      </Icon>
      <Text>
        <Highlight>{`'${search}' `}</Highlight>에 관련된 이미지를 찾지 못했습니다.
      </Text>
    </Container>
  );
}

export default memo(NotFound);
