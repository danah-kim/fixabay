import { memo, useCallback, MouseEvent, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import tw, { styled } from 'twin.macro';
import { GoSearch } from 'react-icons/go';
import { IoCloseCircle } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { STORAGE_KEY } from 'constant';
import useLocalStorage from 'lib/hooks/useLocalStorage';
import { getLastUrlParam } from 'lib/utils';
import { SearchFormValues } from 'types/common';
import SearchPopper from './HeaderSearchPopper';

const Container = styled.div`
  ${tw`px-2 flex-auto min-h-0 min-w-0`};

  @media (min-width: 850px) {
    min-width: 407px;
  }
`;
const Box = tw.div`flex items-center h-12 rounded-3xl bg-gray-100 transition-colors duration-100 ease-in-out hover:bg-gray-200`;
const Inner = tw.div`flex items-center py-0 pr-3 pl-4 h-full flex-auto min-h-0 min-w-0`;
const SearchIcon = tw.div`pr-2 text-gray-500 flex`;
const InputBox = styled.div`
  ${tw`h-full flex-auto min-h-0 min-w-0`};

  form {
    height: 100%;
  }
`;
const Input = tw.input`w-full h-full border-none bg-transparent`;
const ClearSearch = styled.div`
  ${tw`ml-3 text-gray-700 text-2xl cursor-pointer`};
  flex: 0 0 auto;
`;

function HeaderSearch() {
  const history = useHistory();
  const location = useLocation();
  const [focused, toggleFocused] = useToggle(false);
  const [referenceRef, setReferenceRef] = useState<HTMLDivElement | null>(null);
  const [visiblePopper, toggleVisible] = useToggle(false);
  const [recentSearches, setRecentSearches, removeRecentSearches] = useLocalStorage<string[]>(
    STORAGE_KEY.recentSearches
  );
  const {
    register,
    watch,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
    setFocus,
  } = useForm();
  const search = getLastUrlParam(location.search, 'q');
  const { t } = useTranslation();

  useEffect(() => {
    watch('search') !== search && setValue('search', search || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const onFocus = useCallback(() => {
    toggleFocused();
    toggleVisible();
  }, [toggleFocused, toggleVisible]);

  const onBlur = useCallback(() => {
    toggleFocused();
    toggleVisible();
  }, [toggleFocused, toggleVisible]);

  const onClearSearch = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setFocus('search');
      reset();
    },
    [reset, setFocus]
  );

  const onSubmit: SubmitHandler<SearchFormValues> = useCallback(
    async ({ search }) => {
      if (!search) return;

      setRecentSearches(
        recentSearches?.length
          ? Array.from(new Set(recentSearches.concat(search).slice(recentSearches.length > 1 ? -5 : 0)))
          : [search]
      );
      history.push(`${location.pathname}?q=${search}`);
      (document.activeElement as HTMLElement).blur();
    },
    [history, location.pathname, recentSearches, setRecentSearches]
  );

  const onClearRecentSearches = useCallback(() => {
    removeRecentSearches(STORAGE_KEY.recentSearches);
    setFocus('search');
    reset();
  }, [removeRecentSearches, reset, setFocus]);

  const onClickChip = useCallback(
    (search: string) => () => {
      history.push(`${location.pathname}?q=${search}`);
    },
    [history, location.pathname]
  );

  return (
    <>
      <Container>
        <Box ref={setReferenceRef}>
          <Inner>
            {!focused && !watch('search') && (
              <SearchIcon>
                <GoSearch />
              </SearchIcon>
            )}
            <InputBox>
              <form onSubmit={handleSubmit<SearchFormValues>(onSubmit)} noValidate>
                <Input
                  type="search"
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder={t('search.placeholder')}
                  {...register('search')}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  required
                />
                {errors.search && <p>{errors.search.message}</p>}
              </form>
            </InputBox>
            {!!watch('search') && (
              <ClearSearch onClick={onClearSearch}>
                <IoCloseCircle />
              </ClearSearch>
            )}
          </Inner>
        </Box>
      </Container>
      <SearchPopper
        visible={visiblePopper && !watch('search') && !!recentSearches?.length}
        referenceRef={referenceRef}
        recentSearches={recentSearches}
        onClearRecentSearches={onClearRecentSearches}
        onClickChip={onClickChip}
      />
    </>
  );
}

export default memo(HeaderSearch);
