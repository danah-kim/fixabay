import { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import styled from 'styled-components/macro';
import { Menu, SearchFormValues } from 'types/common';
import Header from './Header';
import ReactHelmet from './ReactHelmet';

const Content = styled.div`
  padding-top: 80px;
`;

interface PageTemplateProps {
  isLoading: boolean;
  isError: boolean;
  menu: Menu[];
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
  const location = useLocation();

  return (
    <>
      <ReactHelmet
        title={`${title}${location.pathname?.substring(location.pathname?.lastIndexOf('/')).replace('/', '-')}`}
        description={description}
        canonical={path}
      />
      <div>
        <Header homePath={path} menu={menu} onSubmitSearch={onSubmitSearch} />
        {isLoading ? <p>Loading...</p> : isError ? <span>Error</span> : <Content>{children}</Content>}
      </div>
    </>
  );
}

export default PageTemplate;
