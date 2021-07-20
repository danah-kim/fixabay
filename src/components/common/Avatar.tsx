import { memo } from 'react';

function Avatar() {
  return (
    <div style={{ display: 'block', boxSizing: 'border-box', padding: 0 }}>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: 'rgba(0,0,0,.1)',
          padding: 10,
          width: 20,
        }}
      >
        DA
      </div>
    </div>
  );
}

export default memo(Avatar);
