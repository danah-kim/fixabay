import { useCallback, CSSProperties } from 'react';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import { TiArrowDownThick } from 'react-icons/ti';
import { downloadImage } from 'lib/utils';

const Button = styled.div`
  ${tw`bg-green-500 rounded-full p-1.5 cursor-pointer hover:shadow-md`};

  svg {
    ${tw`text-white text-lg`};
  }
`;

interface DownloadButtonProps {
  name: string;
  url: string;
  style?: CSSProperties | undefined;
}

function DownloadButton({ name, url, style }: DownloadButtonProps) {
  const onClickDownload = useCallback(
    async (e) => {
      e.stopPropagation();
      await downloadImage(name, url);
    },
    [name, url]
  );

  return (
    <Button style={style} onClick={onClickDownload}>
      <TiArrowDownThick />
    </Button>
  );
}

export default DownloadButton;
