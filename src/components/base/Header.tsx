import { memo } from 'react';
import { SubmitHandler } from 'react-hook-form';
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
      }}
    >
      <Menu homePath={homePath} menu={menu} />
      <Search onSubmit={onSubmitSearch} />
      <Avatar />
    </div>
  );
}

export default memo(Header);
