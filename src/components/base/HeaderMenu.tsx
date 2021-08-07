import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import { Menu as MenuT } from 'types/common';
import { getLastUrlParam } from 'lib/utils';
import { FormattedHtmlMessage } from 'components/common/FormattedMessage';

const List = styled.div`
  ${tw`flex flex-row items-center`};
`;
const MenuBase = tw(Link)`h-12 px-2 whitespace-nowrap font-semibold`;
const Logo = tw(MenuBase)`mr-2 text-gray-800`;
const Item = styled(MenuBase)<{ $current: boolean }>`
  ${tw`rounded-3xl`};
  ${({ $current }) => ($current ? tw`bg-green-500 text-white` : tw`bg-white text-green-500`)};

  :not(:last-of-type) {
    margin-right: 4px;
  }
  :hover {
    ${tw`transition duration-300 ease-in-out shadow-md cursor-pointer`};
    ${({ $current }) => !$current && tw`bg-green-500 text-white`};
  }
  @media (max-width: 580px) {
    display: none;
  }
`;
const Inner = styled.div`
  ${tw`h-full flex items-center`};
  word-break: keep-all;
`;

interface HeaderMenuProps {
  homePath: string;
  menu: MenuT[];
}

function HeaderMenu({ homePath, menu }: HeaderMenuProps) {
  const location = useLocation();
  const search = getLastUrlParam(location.search, 'q') || '';

  return (
    <List>
      <Logo to={homePath}>
        <Inner>Fixabay</Inner>
      </Logo>
      {menu.map(({ path, name }) => (
        <Menu
          key={name}
          path={search ? `${path}?q=${search}` : path}
          name={name}
          current={path !== homePath && path === location.pathname}
        />
      ))}
    </List>
  );
}

const Menu = memo(function Menu({ path, name, current }: { path: string; name: string; current: boolean }) {
  return (
    <Item to={path} $current={current}>
      <Inner>
        <FormattedHtmlMessage message={`imageType.${name}`} />
      </Inner>
    </Item>
  );
});

export default memo(HeaderMenu);
