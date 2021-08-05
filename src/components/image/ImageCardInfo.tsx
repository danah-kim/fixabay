import { memo } from 'react';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import { TiHeart, TiEye } from 'react-icons/ti';
import { IoMdCloudDownload } from 'react-icons/io/';
import { Image } from 'types/api';
import DownloadButton from 'components/common/DownloadButton';

const Base = tw.div`absolute inset-0 rounded-2xl`;
const Container = styled.div<{ $isHover: boolean }>`
  ${tw`box-border transition-opacity duration-150 ease-in-out`};
  opacity: ${({ $isHover }) => +$isHover};
`;
const Drop = styled(Base)`
  ${tw`bg-gradient-to-b from-transparent via-transparent to-black opacity-60`}
`;
const Top = tw.div`box-border m-3 flex`;
const Bottom = tw.div`absolute left-0 right-0 bottom-0`;
const Statistics = tw.div`box-border p-3 pb-2.5 flex`;
const Statistic = styled.div`
  ${tw`text-white flex items-center box-border text-xs font-medium`}

  :not(:last-of-type) {
    margin-right: 8px;
  }
  svg {
    font-size: 18px;
    margin-right: 4px;
  }
`;

interface ImageCardInfoProps extends Pick<Image, 'id' | 'largeImageURL' | 'likes' | 'views' | 'downloads'> {
  isHover: boolean;
}

function ImageCardInfo({ isHover, id, largeImageURL, likes, views, downloads }: ImageCardInfoProps) {
  return (
    <>
      <Container $isHover={isHover}>
        <Drop />
      </Container>
      <Container $isHover={isHover} style={{ zIndex: 100 }}>
        <Base>
          <Top>
            <DownloadButton name={`${id}`} url={largeImageURL} style={{ marginLeft: 'auto' }} />
          </Top>
        </Base>
      </Container>
      <Container $isHover={isHover}>
        <Bottom>
          <Statistics>
            <Statistic>
              <TiHeart />
              {likes}
            </Statistic>
            <Statistic>
              <TiEye />
              {views}
            </Statistic>
            <Statistic>
              <IoMdCloudDownload />
              {downloads}
            </Statistic>
          </Statistics>
        </Bottom>
      </Container>
    </>
  );
}

export default memo(ImageCardInfo);
