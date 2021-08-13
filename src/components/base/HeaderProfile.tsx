import { memo, useCallback, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { HiOutlineGlobe } from 'react-icons/hi';
import { usePopper } from 'react-popper';
import { useToggle } from 'react-use';
import supportLanguages, { Language } from 'lib/languages';
import i18n from 'lib/i18n';

const Container = tw.div`w-12 h-12`;
const Box = tw.div`w-full h-full flex items-center justify-items-center`;
const LangIcon = styled.div`
  ${tw`rounded-full cursor-pointer p-2.5 text-xl text-green-500 w-full h-full hover:bg-gray-100 transition duration-300 ease-in-out`};

  svg {
    width: 100%;
    height: 100%;
  }
`;
const Popper = styled.div<{ $visible: boolean }>`
  ${tw` rounded-xl shadow-lg transition duration-300 ease-in-out z-20 bg-white`};
  opacity: ${({ $visible }) => +$visible};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  box-shadow: 0 10px 70px rgb(0 0 0 / 15%);
  transition: visibility 200ms linear, opacity 150ms linear;
`;
const Lang = tw.div`text-gray-800 font-semibold hover:bg-green-500 hover:bg-opacity-10 hover:text-green-500 px-5 py-3 text-center rounded-xl transition duration-300 ease-in-out cursor-pointer`;

function HeaderProfile() {
  const [visible, toggle] = useToggle(false);
  const [referenceRef, setReferenceRef] = useState<HTMLDivElement | null>(null);
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
  const onClickLang = useCallback(
    (langCode: Language['langCode']) => () => {
      i18n.changeLanguage(langCode);
      toggle();
    },
    [toggle]
  );

  return (
    <>
      <Container ref={setReferenceRef}>
        <Box>
          <LangIcon onClick={toggle}>
            <HiOutlineGlobe />
          </LangIcon>
        </Box>
      </Container>
      <Popper $visible={visible} ref={setPopperRef} style={styles.popper} {...attributes.popper}>
        <Lang onClick={onClickLang(supportLanguages.korean.langCode)}>한국어</Lang>
        <Lang onClick={onClickLang(supportLanguages.english.langCode)}>English</Lang>
      </Popper>
    </>
  );
}

export default memo(HeaderProfile);
