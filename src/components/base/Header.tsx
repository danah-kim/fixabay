import { memo } from 'react';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import { useRecoilValue } from 'recoil';
import shadowToggleState from 'lib/recoil/shadowToggle';
import { Menu as MenuT } from 'types/common';
import Menu from './HeaderMenu';
import Search from './HeaderSearch';
import Profile from './HeaderProfile';

const Container = styled.div<{ showShadow: boolean }>`
  ${tw`w-full fixed flex flex-row items-center box-border px-4 py-1 top-0 h-20 bg-white z-10`};
  box-shadow: ${({ showShadow }) => showShadow && 'rgb(0 0 0 / 10%) 0px 8px 8px -8px'};
  transition: ${({ showShadow }) => showShadow && tw`transition-shadow duration-300 ease-in-out`};
`;

interface HeaderProps {
  homePath: string;
  menu: MenuT[];
}

function Header({ homePath, menu }: HeaderProps) {
  const shadowToggle = useRecoilValue(shadowToggleState);

  return (
    <Container showShadow={shadowToggle}>
      <Menu homePath={homePath} menu={menu} />
      <Search />
      <Profile />
    </Container>
  );
}

export default memo(Header);
