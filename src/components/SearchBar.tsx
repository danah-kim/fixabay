import { memo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SearchFormValues } from 'types/common';

interface SearchBarProps {
  onSubmit: SubmitHandler<SearchFormValues>;
}

function SearchBar({ onSubmit }: SearchBarProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <input
        type="search"
        autoComplete="off"
        autoCapitalize="none"
        spellCheck={false}
        placeholder="이미지 검색"
        {...register('keyword', {
          required: '검색어를 입력해주세요.',
        })}
      />
      {errors.keyword && <p>{errors.keyword.message}</p>}
    </form>
  );
}

export default memo(SearchBar);
