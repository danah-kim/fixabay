import { useCallback, CSSProperties, memo } from 'react';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import { TiArrowDownThick } from 'react-icons/ti';
import { downloadImage } from 'lib/utils';

const Button = styled.div<{ $visibleText: boolean }>`
  ${tw`bg-green-500 p-1.5 cursor-pointer transition duration-300 ease-in-out hover:bg-green-600 pointer-events-auto`};
  ${({ $visibleText }) => ($visibleText ? tw`rounded-3xl` : tw`rounded-full`)};

  svg {
    ${tw`text-white text-lg`};
  }
`;
const Text = tw.p`text-white text-sm font-semibold px-2.5 py-1`;

interface DownloadButtonProps {
  name: string;
  url: string;
  style?: CSSProperties | undefined;
  visibleText?: boolean;
}

function DownloadButton({ name, url, style, visibleText = false }: DownloadButtonProps) {
  const onClickDownload = useCallback(
    async (e) => {
      e.stopPropagation();
      await downloadImage(name, url);
    },
    [name, url]
  );

  return (
    <Button style={style} onClick={onClickDownload} $visibleText={visibleText}>
      {visibleText ? <Text>Download</Text> : <TiArrowDownThick />}
    </Button>
  );
}

export default memo(DownloadButton);
