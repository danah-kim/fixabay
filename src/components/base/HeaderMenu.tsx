import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-use';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import { Menu as MenuT } from 'types/common';

const List = styled.div`
  ${tw`flex flex-row items-center`};
`;
const MenuBase = tw(Link)`h-12 px-2 whitespace-nowrap font-semibold`;
const Logo = tw(MenuBase)`mr-2 text-gray-800`;
const Item = styled(MenuBase)<{ $current: boolean }>`
  ${tw`rounded-3xl`}
  ${({ $current }) => ($current ? tw`bg-green-500 text-white` : tw`bg-white text-green-500`)};

  :not(:last-of-type) {
    margin-right: 4px;
  }
  :hover {
    ${tw`transition duration-300 ease-in-out shadow-md cursor-pointer`};
    ${({ $current }) => !$current && tw`bg-green-500 text-white`};
  }
`;
const Inner = tw.div`h-full flex items-center`;

interface HeaderMenuProps {
  homePath: string;
  menu: MenuT[];
}

function HeaderMenu({ homePath, menu }: HeaderMenuProps) {
  const location = useLocation();

  return (
    <List>
      <Logo to={homePath}>
        <Inner>Fixabay</Inner>
      </Logo>
      {menu.map(({ path, name }) => (
        <Menu key={name} path={path} name={name} current={path !== homePath && path === location.pathname} />
      ))}
    </List>
  );
}

const Menu = memo(function Menu({ path, name, current }: { path: string; name: string; current: boolean }) {
  return (
    <Item to={path} $current={current}>
      <Inner>{name}</Inner>
    </Item>
  );
});

export default memo(HeaderMenu);
