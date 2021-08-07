import { memo } from 'react';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import { formatNumberWithCommas } from 'lib/utils';
import Menu from './ImageDetailMenu';
import UserProfile from 'components/common/UserProfile';

const Container = styled.div`
  ${tw`flex items-center px-8 pt-4 pb-8 mx-auto grid gap-4`};
  grid-template-columns: repeat(1, 1fr 3fr 1fr);

  @media (max-width: 755px) {
    padding: 12px 16px;
  }
  @media (max-width: 580px) {
    padding: 24px 32px;
  }
`;
const User = styled.div`
  @media (max-width: 580px) {
    display: none;
  }
`;
const Statistics = styled.div`
  ${tw`box-border flex grid gap-4`};
  grid-template-columns: repeat(3, minmax(min-content, 120px));

  @media (max-width: 1007px) {
    gap: 8px;
    grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
  }
`;
const Statistic = styled.div`
  ${tw`flex flex-col box-border text-xs text-gray-800 font-semibold`};
`;
const Downloads = styled(Statistic)`
  @media (max-width: 1007px) {
    display: none;
  }
`;
const Label = tw.p`text-gray-500 font-medium`;

interface ImageDetailInfoProps {
  visibleMenu: boolean;
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
  visibleMenu,
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
        <UserProfile user={user} userImageURL={userImageURL} style={{ padding: 0, fontWeight: 700 }} />
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
        <Downloads>
          <Label>Downloads</Label>
          {formatNumberWithCommas(downloads)}
        </Downloads>
      </Statistics>
      {visibleMenu && <Menu id={id} url={url} />}
    </Container>
  );
}
export default memo(ImageDetailInfo);