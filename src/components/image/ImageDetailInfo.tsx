import { memo } from 'react';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import { formatNumberWithCommas } from 'lib/utils';
import ImageDetailMenu from './ImageDetailMenu';
import UserProfile from 'components/common/UserProfile';

const Container = styled.div`
  ${tw`flex items-center px-8 pt-4 pb-8 flex-wrap mx-auto`};

  @media (max-width: 755px) {
    padding: 12px 16px;
  }
  @media (max-width: 580px) {
    padding: 24px 32px;
  }
`;
const User = styled.div`
  padding-right: 16px;

  @media (max-width: 580px) {
    display: none;
  }
  @media (max-width: 755px) {
    padding-right: 20px;
  }
`;
const Statistics = styled.div`
  ${tw`box-border flex pr-4 py-4 mr-auto`};

  @media (max-width: 580px) {
    padding: 0;
  }
`;
const Statistic = styled.div`
  ${tw`flex flex-col box-border text-xs text-gray-800 font-semibold`};
  min-width: 84px;

  p {
    font-weight: 500;
  }
`;
const Label = tw.p`text-gray-500`;

interface ImageDetailInfoProps {
  width: number;
  maxWidth: string;
  id: number;
  user: string;
  userImageURL: string;
  likes: number;
  views: number;
  downloads: number;
  url: string;
}

function ImageDetailInfo({
  width,
  maxWidth,
  id,
  user,
  userImageURL,
  likes,
  views,
  downloads,
  url,
}: ImageDetailInfoProps) {
  return (
    <Container style={{ maxWidth }}>
      <User>
        <UserProfile user={user} userImageURL={userImageURL} style={{ padding: 0 }} />
      </User>
      <Statistics>
        <Statistic>
          <Label>Likes</Label>
          {formatNumberWithCommas(likes)}
        </Statistic>
        <Statistic>
          <Label>Views</Label>
          {formatNumberWithCommas(views)}
        </Statistic>
        <Statistic>
          <Label>Downloads</Label>
          {formatNumberWithCommas(downloads)}
        </Statistic>
      </Statistics>
      {width > 580 && <ImageDetailMenu id={id} url={url} />}
    </Container>
  );
}
export default memo(ImageDetailInfo);
