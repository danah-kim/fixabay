import { useCallback, memo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import { RiEmotionSadLine } from 'react-icons/ri';
import { FaRegSurprise } from 'react-icons/fa';
import routes from 'routes';
import { getLastUrlParam } from 'lib/utils';

const Container = styled.div`
  ${tw`w-full flex flex-col justify-items-center items-center py-12 mt-14`};
`;
const Icon = styled.div`
  ${tw`w-28 h-28 rounded-full mx-auto mb-6`};

  svg {
    ${tw`text-green-500 w-full h-full`};
  }
`;
const Text = tw.p`text-2xl font-semibold px-8 text-center`;
const Highlight = tw.span`text-green-500`;
const Button = tw.button`bg-green-500 text-white py-2 px-4 mt-8 text-base rounded-xl hover:bg-green-700 font-semibold`;

interface NotFound {
  isSearch?: boolean;
  isError?: boolean;
}

function NotFound({ isSearch = false, isError = true }: NotFound) {
  const history = useHistory();
  const location = useLocation();
  const search = getLastUrlParam(history.location.search, 'q');

  const onClick = useCallback(() => {
    history.replace(routes[location.pathname.includes(routes.swr.path) ? 'swr' : 'reactQuery'].path);
  }, [history, location.pathname]);

  return (
    <Container>
      <Icon>{isError ? <FaRegSurprise /> : <RiEmotionSadLine />}</Icon>
      <Text>
        {isSearch ? (
          <>
            {"We couldn't find any Picture for "}
            <Highlight>{`'${search}' `}</Highlight>.
          </>
        ) : isError ? (
          'Something wrong here... Head back to Home'
        ) : (
          "We can't find the page you're looking for"
        )}
      </Text>
      {!isSearch && <Button onClick={onClick}>Home</Button>}
    </Container>
  );
}

export default memo(NotFound);
