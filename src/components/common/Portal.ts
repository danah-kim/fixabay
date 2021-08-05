import { PropsWithChildren, memo } from 'react';
import ReactDOM from 'react-dom';

function Portal({ children }: PropsWithChildren<Record<string, unknown>>) {
  const el = document.getElementById('portal');

  return ReactDOM.createPortal(children, el!);
}

export default memo(Portal);
