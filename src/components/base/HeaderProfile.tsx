import { memo } from 'react';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import { FaUserCircle } from 'react-icons/fa';

const Container = styled.div`
  ${tw`w-12 h-12`};
`;
const Box = tw.div`w-full h-full flex items-center justify-items-center`;
const Avatar = styled.div`
  ${tw`w-8 h-8 rounded-full mx-auto`};

  svg {
    ${tw`text-gray-500 w-full h-full`};
  }
`;

function HeaderProfile() {
  return (
    <Container>
      <Box>
        <Avatar>
          <FaUserCircle />
        </Avatar>
      </Box>
    </Container>
  );
}

export default memo(HeaderProfile);
