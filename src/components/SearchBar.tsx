import { memo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { STORAGE_KEY } from 'constant';
import useLocalStorage from 'hooks/useLocalStorage';
import { SearchFormValues } from 'types/common';

interface SearchBarProps {
  onSubmit: SubmitHandler<SearchFormValues>;
}

function SearchBar({ onSubmit }: SearchBarProps) {
  const [value, setValue] = useLocalStorage<string[]>(STORAGE_KEY.recentKeywords);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit<SearchFormValues>(({ search, ...rest }) => {
        setValue(value?.length ? value.concat(search).slice(value.length > 1 ? -4 : 0) : [search]);
        return onSubmit({ search, ...rest });
      })}
      noValidate
    >
      <input
        type="search"
        autoComplete="off"
        autoCapitalize="none"
        spellCheck={false}
        placeholder="이미지 검색"
        {...register('search', {
          required: '검색어를 입력해주세요.',
        })}
      />
      {errors.search && <p>{errors.search.message}</p>}
    </form>
  );
}

export default memo(SearchBar);
