import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-use';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import { Menu as MenuT } from 'types/common';

const List = styled.div`
  ${tw`flex flex-row items-center`};
`;

interface HeaderMenuProps {
  homePath: string;
  menu: MenuT[];
}

function HeaderMenu({ homePath, menu }: HeaderMenuProps) {
  const location = useLocation();

  return (
    <List>
      {[{ path: homePath, name: 'Fixabay' }, ...menu].map(({ path, name }) => (
        <Menu key={name} path={path} name={name} current={path !== homePath && path === location.pathname} />
      ))}
    </List>
  );
}

const Item = styled(Link)<{ current: boolean }>`
  ${tw`h-12 px-2 whitespace-nowrap rounded-3xl font-semibold`};
  ${({ current }) => (current ? tw`bg-green-500 text-white shadow-md` : tw`text-green-500`)};

  :not(:last-of-type) {
    margin-right: 4px;
  }
  :hover {
    ${tw`transition duration-300 ease-in-out shadow-md cursor-pointer`};
    ${({ current }) => (current ? tw`bg-white text-green-500 shadow-none` : tw`bg-green-500 text-white`)};
  }
`;
const Inner = tw.div`h-full flex items-center`;

const Menu = memo(function Menu({ path, name, current }: { path: string; name: string; current: boolean }) {
  return (
    <Item to={path} current={current}>
      <Inner>{name}</Inner>
    </Item>
  );
});

export default memo(HeaderMenu);
