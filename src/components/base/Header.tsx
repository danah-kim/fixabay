import { memo } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import shadowToggleState from 'recoil/atom';
import { SearchFormValues } from 'types/common';
import Avatar from 'components/common/Avatar';
import Menu from './HeaderMenu';
import Search from './HeaderSearch';

interface HeaderProps {
  homePath: string;
  menu: { path: string; name: string }[];
  onSubmitSearch: SubmitHandler<SearchFormValues>;
}

function Header({ homePath, menu, onSubmitSearch }: HeaderProps) {
  const shadowToggle = useRecoilValue(shadowToggleState);

  return (
    <div
      style={{
        height: 56,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: 10,
        position: 'fixed',
        top: 0,
        zIndex: 1,
        backgroundColor: '#fff',
        boxShadow: shadowToggle ? 'rgb(0 0 0 / 10%) 0px 8px 8px -8px' : undefined,
        transition: shadowToggle ? 'box-shadow 300ms ease-in-out 0s' : undefined,
      }}
    >
      <Menu homePath={homePath} menu={menu} />
      <Search onSubmit={onSubmitSearch} />
      <Avatar />
    </div>
  );
}

export default memo(Header);
