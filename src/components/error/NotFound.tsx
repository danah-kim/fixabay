import { useCallback, memo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { RiEmotionSadLine } from 'react-icons/ri';
import { FaRegSurprise } from 'react-icons/fa';
import routes from 'routes';
import { getLastUrlParam } from 'lib/utils';
import { FormattedHtmlMessage } from 'components/common/FormattedMessage';

const Container = tw.div`w-full flex flex-col justify-items-center items-center py-12 mt-14`;
const Icon = styled.div`
  ${tw`w-28 h-28 rounded-full mx-auto mb-6`};

  svg {
    ${tw`text-green-500 w-full h-full`};
  }
`;
const Text = tw.p`text-2xl font-semibold px-8 text-center`;
const Button = tw.button`bg-green-500 text-white py-2 px-4 mt-8 text-base rounded-xl hover:bg-green-700 font-semibold`;

interface NotFound {
  isSearch?: boolean;
  isError?: boolean;
}

function NotFound({ isSearch = false, isError = true }: NotFound) {
  const history = useHistory();
  const location = useLocation();
  const search = getLastUrlParam(history.location.search, 'q') || '';

  const onClick = useCallback(() => {
    history.replace(routes[location.pathname.includes(routes.swr.path) ? 'swr' : 'reactQuery'].path);
  }, [history, location.pathname]);

  return (
    <Container>
      <Icon>{isError ? <FaRegSurprise /> : <RiEmotionSadLine />}</Icon>
      <Text>
        {isSearch ? (
          <FormattedHtmlMessage message="error.noResult" params={{ search }} isHtml />
        ) : isError ? (
          <FormattedHtmlMessage message="error.backToHome" isHtml />
        ) : (
          <FormattedHtmlMessage message="error.noPage" />
        )}
      </Text>
      {!isSearch && (
        <Button onClick={onClick}>
          <FormattedHtmlMessage message="button.home" />
        </Button>
      )}
    </Container>
  );
}

export default memo(NotFound);
