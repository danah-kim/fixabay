import { memo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { STORAGE_KEY } from 'constant';
import useLocalStorage from 'hooks/useLocalStorage';
import { SearchFormValues } from 'types/common';

interface HeaderSearchProps {
  onSubmit: SubmitHandler<SearchFormValues>;
}

function HeaderSearch({ onSubmit }: HeaderSearchProps) {
  const [value, setValue] = useLocalStorage<string[]>(STORAGE_KEY.recentKeywords);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <div
      style={{
        display: 'block',
        boxSizing: 'border-box',
        paddingLeft: 8,
        paddingRight: 8,
        flex: '1 1 auto',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          backgroundColor: '#efefef',
          borderRadius: 24,
          paddingLeft: 10,
        }}
      >
        <form
          style={{
            height: '100%',
          }}
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
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: 'transparent',
            }}
          />
          {errors.search && <p>{errors.search.message}</p>}
        </form>
      </div>
    </div>
  );
}

export default memo(HeaderSearch);
