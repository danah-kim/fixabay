import { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Menu } from 'types/common';
import Header from './Header';
import ReactHelmet from './ReactHelmet';
import NotFound from 'components/error/NotFound';
import HashLoader from 'components/common/HashLoader';

const Content = styled.div`
  padding-top: 80px;
`;

interface PageTemplateProps {
  isLoading: boolean;
  isError: boolean;
  menu: Menu[];
  title: string;
  description: string;
  path: string;
}

function PageTemplate({
  children,
  isLoading,
  isError,
  menu,
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
        <Header homePath={path} menu={menu} />
        {isLoading ? <HashLoader /> : isError ? <NotFound isError /> : <Content>{children}</Content>}
      </div>
    </>
  );
}

export default PageTemplate;
