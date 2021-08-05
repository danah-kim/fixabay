import { memo } from 'react';
import styled, { keyframes } from 'styled-components';
import tw from 'twin.macro';
import Portal from './Portal';

const Container = tw.div`absolute top-1/2 left-1/2 z-30`;
const Box = tw.div`rounded-3xl shadow-xl min-w-0`;
const InnerBox = styled.span`
  position: relative;
  width: 150px;
  height: 150px;
  transform: rotate(165deg);
`;
const Bar1 = styled.span`
  position: absolute;
  content: '';
  top: 50%;
  left: 50%;
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  transform: translate(-50%, -50%);
  animation-fill-mode: none;
  animation: ${keyframes`
  0% {
    width: 30px;
    box-shadow: 60px -30px rgba(16, 185, 129, 0.75), -60px 30px rgba(16, 185, 129, 0.75);
  }
  35% {
    width: 150px;
    box-shadow: 0 -30px rgba(16, 185, 129, 0.75), 0 30px rgba(16, 185, 129, 0.75);
    }
  70% {
    width: 30px;
    box-shadow: -60px -30px rgba(16, 185, 129, 0.75), 60px 30px rgba(16, 185, 129, 0.75);
    }
  100% {
    box-shadow: 60px -30px rgba(16, 185, 129, 0.75), -60px 30px rgba(16, 185, 129, 0.75);
  }
`} 2s infinite;
`;
const Bar2 = styled.span`
  position: absolute;
  content: '';
  top: 50%;
  left: 50%;
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  transform: translate(-50%, -50%);
  animation-fill-mode: none;
  animation: ${keyframes`
  0% {
    height: 30px;
    box-shadow: 30px 60px rgba(16, 185, 129, 0.75) ,-30px -60px rgba(16, 185, 129, 0.75);
  }
  35% {
    height: 150px;
    box-shadow: 30px 0 rgba(16, 185, 129, 0.75), -30px 0 rgba(16, 185, 129, 0.75);
  }
  70% {
    height: 30px;
    box-shadow: 30px -60px rgba(16, 185, 129, 0.75), -30px 60px rgba(16, 185, 129, 0.75);
  }
  100% {
    box-shadow: 30px 60px rgba(16, 185, 129, 0.75), -30px -60px rgba(16, 185, 129, 0.75);
  }
`} 2s infinite;
`;

function HashLoader() {
  return (
    <Portal>
      <Container>
        <Box>
          <InnerBox>
            <Bar1 />
            <Bar2 />
          </InnerBox>
        </Box>
      </Container>
    </Portal>
  );
}

export default memo(HashLoader);
