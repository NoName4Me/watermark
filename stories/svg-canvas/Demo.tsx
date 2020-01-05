import React from 'react';

type DemoProps = {
  title: string;
  desc?: string;
  children?: any;
};
export default (props: DemoProps) => {
  const { title, desc, children } = props;
  return (
    <div style={{ padding: '20px', border: '1px solid #f0f2f5', color: '#33383d' }}>
      <div style={{ fontSize: '14px' }}>{title}</div>
      <div
        style={{
          fontSize: '12px',
          padding: '10px',
          borderBottom: '1px solid #f0f2f5',
          color: '#33383d',
          marginBottom: '10px',
        }}
      >
        {desc}
      </div>
      <div>{children}</div>
    </div>
  );
};
