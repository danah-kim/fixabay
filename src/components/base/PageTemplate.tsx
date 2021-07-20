import { PropsWithChildren } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { SearchFormValues } from 'types/common';
import Header from './Header';
import ReactHelmet from './ReactHelmet';

interface PageTemplateProps {
  isLoading: boolean;
  isError: boolean;
  menu: { path: string; name: string }[];
  onSubmitSearch: SubmitHandler<SearchFormValues>;
  title: string;
  description: string;
  path: string;
}

function PageTemplate({
  children,
  isLoading,
  isError,
  menu,
  onSubmitSearch,
  title,
  description,
  path,
}: PropsWithChildren<PageTemplateProps>) {
  return (
    <>
      <ReactHelmet title={title} description={description} canonical={path} />
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <span>Error</span>
      ) : (
        <div>
          <Header homePath={path} menu={menu} onSubmitSearch={onSubmitSearch} />
          {children}
        </div>
      )}
    </>
  );
}

export default PageTemplate;
