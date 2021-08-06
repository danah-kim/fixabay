import { memo, useCallback, MouseEvent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import { GoSearch } from 'react-icons/go';
import { IoCloseCircle } from 'react-icons/io5';
import { STORAGE_KEY } from 'constant';
import useLocalStorage from 'lib/hooks/useLocalStorage';
import { SearchFormValues } from 'types/common';

const Container = styled.div`
  ${tw`px-2 flex-auto min-h-0 min-w-0`};

  @media (min-width: 850px) {
    min-width: 407px;
  }
`;
const Box = tw.div`flex items-center h-12 rounded-3xl bg-gray-100 transition-colors duration-100 ease-in-out hover:bg-gray-200`;
const Inner = tw.div`flex items-center py-0 pr-3 pl-4 h-full flex-auto min-h-0 min-w-0`;
const InputBox = styled.div`
  ${tw`h-full flex-auto min-h-0 min-w-0`};

  form {
    height: 100%;
  }
`;
const Input = tw.input`w-full h-full border-none bg-transparent`;

interface HeaderSearchProps {
  onSubmit: SubmitHandler<SearchFormValues>;
}

function HeaderSearch({ onSubmit }: HeaderSearchProps) {
  const [focused, toggleFocuse] = useToggle(false);
  const [value, setValue] = useLocalStorage<string[]>(STORAGE_KEY.recentKeywords);
  const {
    watch,
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onClear = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      reset();
    },
    [reset]
  );

  return (
    <Container>
      <Box>
        <Inner>
          {!focused && !watch('search') && <SearchBox />}
          <InputBox>
            <form
              onSubmit={handleSubmit<SearchFormValues>(({ search, ...rest }) => {
                setValue(value?.length ? value.concat(search).slice(value.length > 1 ? -4 : 0) : [search]);
                return onSubmit({ search, ...rest });
              })}
              noValidate
            >
              <Input
                type="search"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="이미지 검색"
                {...register('search', {
                  required: '검색어를 입력해주세요.',
                })}
                onFocus={toggleFocuse}
                onBlur={toggleFocuse}
              />
              {errors.search && <p>{errors.search.message}</p>}
            </form>
          </InputBox>
          {!!watch('search') && <ClearBox onClear={onClear} />}
        </Inner>
      </Box>
    </Container>
  );
}

const SearchIcon = styled.div`
  ${tw`pr-2`};

  svg {
    ${tw`text-gray-500`};
  }
`;

const SearchBox = memo(function SearchBox() {
  return (
    <SearchIcon>
      <GoSearch />
    </SearchIcon>
  );
});

const ClearIcon = styled.div`
  ${tw`ml-3`};
  flex: 0 0 auto;

  svg {
    ${tw`text-gray-700 text-2xl`};
  }
`;

const ClearBox = memo(function ClearBox({ onClear }: { onClear: (e: MouseEvent<HTMLDivElement>) => void }) {
  return (
    <ClearIcon onClick={onClear}>
      <IoCloseCircle />
    </ClearIcon>
  );
});

export default memo(HeaderSearch);
