import { useState } from 'react';
import { usePopper } from 'react-popper';
import { IoCloseCircle } from 'react-icons/io5';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import Portal from 'components/common/Portal';

const Popper = styled.div<{ $visible: boolean }>`
  ${tw` px-4 pt-3 pb-6 rounded-xl bg-white z-10`};
  opacity: ${({ $visible }) => +$visible};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  box-shadow: 0 10px 70px rgb(0 0 0 / 15%);
  transition: visibility 200ms linear, opacity 150ms linear;
`;
const Title = tw.div`flex items-center pl-1`;
const Label = tw.div`py-2 px-0`;
const ClearRecentSearches = styled.div`
  ${tw`ml-3 text-gray-700 text-2xl cursor-pointer text-lg ml-1.5 hover:bg-gray-200 p-1 transition duration-300 ease-in-out rounded-3xl`};
  flex: 0 0 auto;
`;
const ChipContainer = styled.div`
  ${tw`flex`}
`;
const ChipBox = tw.div`px-1 mb-2`;
const Chip = tw.div`px-4 py-2 bg-gray-100 rounded-3xl font-bold hover:bg-green-500 hover:bg-opacity-10 hover:text-green-500 transition duration-300 ease-in-out cursor-pointer`;

interface SearchPopperProps {
  visible: boolean;
  referenceRef: HTMLDivElement | null;
  recentSearches: string[] | undefined;
  onClearRecentSearches: () => void;
  onClickChip: (search: string) => () => void;
}

const HeaderSearchPopper = function SearchPopper({
  visible,
  referenceRef,
  recentSearches,
  onClearRecentSearches,
  onClickChip,
}: SearchPopperProps) {
  const [popperRef, setPopperRef] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceRef, popperRef, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'offset',
        enabled: true,
      },
    ],
  });

  return (
    <Portal>
      <Popper $visible={visible} ref={setPopperRef} style={styles.popper} {...attributes.popper}>
        <Title>
          <Label>Recent Searches</Label>
          <ClearRecentSearches onClick={onClearRecentSearches}>
            <IoCloseCircle />
          </ClearRecentSearches>
        </Title>
        <ChipContainer>
          {recentSearches?.map((recentSearch) => (
            <ChipBox key={recentSearch}>
              <Chip onClick={onClickChip(recentSearch)}>{recentSearch}</Chip>
            </ChipBox>
          ))}
        </ChipContainer>
      </Popper>
    </Portal>
  );
};

export default HeaderSearchPopper;
