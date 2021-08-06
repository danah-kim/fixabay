import { CSSProperties, memo } from 'react';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import { AiOutlineSmile } from 'react-icons/ai';

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

interface UserProfileProps {
  user: string;
  userImageURL: string;
  style?: CSSProperties;
}

function UserProfile({ user, userImageURL, style }: UserProfileProps) {
  return (
    <Container style={style}>
      <Info>
        <Avater>{userImageURL ? <Img src={userImageURL} alt={user} /> : <AiOutlineSmile />}</Avater>
        <Name>{user}</Name>
      </Info>
    </Container>
  );
}

export default memo(UserProfile);
