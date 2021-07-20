import { memo } from 'react';
import { Link } from 'react-router-dom';

interface HeaderMenuProps {
  homePath: string;
  menu: { path: string; name: string }[];
}

function HeaderMenu({ homePath, menu }: HeaderMenuProps) {
  return (
    <div style={{ display: 'block', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex' }}>
        <Menu path={homePath} name="Fixabay" />
        {menu.map(({ path, name }) => (
          <Menu key={name} path={path} name={name} />
        ))}
      </div>
    </div>
  );
}

interface MenuProps {
  path: string;
  name: string;
}

function Menu({ path, name }: MenuProps) {
  return (
    <div style={{ paddingLeft: 10, paddingRight: 10 }}>
      <Link to={path}>{name}</Link>
    </div>
  );
}

export default memo(HeaderMenu);
