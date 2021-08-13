import { CSSProperties, memo, useCallback, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { usePopper } from 'react-popper';
import { HiOutlineClipboardCopy } from 'react-icons/hi';
import { useToggle } from 'react-use';
import { copyTextToClipboard } from 'lib/utils';
import DownloadButton from 'components/common/DownloadButton';
import Portal from 'components/common/Portal';
import { FormattedHtmlMessage } from 'components/common/FormattedMessage';

const Container = styled.div`
  ${tw`flex`};

  @media (max-width: 755px) {
    padding: 0 16px;
  }
`;
const Icon = tw.button`mr-4 border-2 border-solid border-green-500 p-2 cursor-pointer transition duration-300 ease-in-out hover:bg-green-500 rounded-full text-green-500 hover:text-white text-lg flex`;
const Popper = styled.div<{ $visible: boolean }>`
  ${tw`px-4 py-3 rounded-xl bg-green-100 shadow-lg text-green-500 font-semibold transition duration-300 ease-in-out z-30`};
  opacity: ${({ $visible }) => +$visible};
`;

interface ImageDetailMenuProps {
  id: number;
  url: string;
  style?: CSSProperties;
}

const ImageDetailMenu = memo(function ButtonMenu({ id, url, style }: ImageDetailMenuProps) {
  const [visible, toggle] = useToggle(false);
  const [referenceRef, setReferenceRef] = useState<HTMLButtonElement | null>(null);
  const [popperRef, setPopperRef] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceRef, popperRef, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'offset',
        enabled: true,
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  const onClickCopy = useCallback(async () => {
    await copyTextToClipboard(url);
    toggle();

    setTimeout(toggle, 2000);
  }, [url, toggle]);

  return (
    <>
      <Container style={style}>
        <Icon ref={setReferenceRef} onClick={onClickCopy}>
          <HiOutlineClipboardCopy />
        </Icon>
        <DownloadButton name={`${id}`} url={url} visibleText />
      </Container>
      <Portal>
        <Popper $visible={visible} ref={setPopperRef} style={styles.popper} {...attributes.popper}>
          <FormattedHtmlMessage message="detail.copied" />
        </Popper>
      </Portal>
    </>
  );
});

export default memo(ImageDetailMenu);
