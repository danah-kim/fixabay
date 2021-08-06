import { CSSProperties, memo, useCallback } from 'react';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import { HiOutlineClipboardCopy } from 'react-icons/hi';
import { copyTextToClipboard } from 'lib/utils';
import DownloadButton from 'components/common/DownloadButton';

const Container = styled.div`
  ${tw`flex py-4 justify-end`};
`;
const Icon = styled.button`
  ${tw`mr-4 border-2 border-solid border-green-500 p-2 cursor-pointer transition duration-300 ease-in-out hover:bg-green-500 rounded-full text-green-500  hover:text-white`};

  svg {
    ${tw`text-lg`};
  }
`;

interface ImageDetailMenuProps {
  id: number;
  url: string;
  style?: CSSProperties;
}

const ImageDetailMenu = memo(function ButtonMenu({ id, url, style }: ImageDetailMenuProps) {
  const onClickCopy = useCallback(() => {
    copyTextToClipboard(url);
    window.alert('copied!');
  }, [url]);

  return (
    <Container style={{ ...style }}>
      <Icon onClick={onClickCopy}>
        <HiOutlineClipboardCopy />
      </Icon>
      <DownloadButton name={`${id}`} url={url} visibleText />
    </Container>
  );
});

export default memo(ImageDetailMenu);
