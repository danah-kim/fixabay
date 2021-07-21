import { useCallback, CSSProperties } from 'react';
import { downloadImage } from 'lib/utils';

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
    <button
      style={{
        padding: 10,
        cursor: 'pointer',
        ...style,
      }}
      onClick={onClickDownload}
    >
      저장
    </button>
  );
}

export default DownloadButton;
