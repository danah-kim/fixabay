import { memo } from 'react';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import { AiOutlineSmile } from 'react-icons/ai';
import { Image } from 'types/api';

const Container = styled.div`
  ${tw`p-2 pb-4 box-border`};
`;
const Info = tw.div`flex items-center -mx-1`;
const Avater = styled.div({
  ...tw`w-6 h-auto mx-1`,
  flex: '0 0 auto',
});
const Name = tw.div`mx-1 flex-auto text-sm text-gray-800`;
const Img = tw.img`w-full rounded-2xl`;

type UserProfileProps = Pick<Image, 'user' | 'userImageURL'>;

function UserProfile({ user, userImageURL }: UserProfileProps) {
  return (
    <Container>
      <Info>
        <Avater>{userImageURL ? <Img src={userImageURL} alt={user} /> : <AiOutlineSmile />}</Avater>
        <Name>{user}</Name>
      </Info>
    </Container>
  );
}

export default memo(UserProfile);
