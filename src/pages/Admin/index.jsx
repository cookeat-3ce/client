import React from 'react';

const Admin = () => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '70vw', height: '30vh', background: 'red' }}>
          1
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: '30vw', height: '20vh', background: 'blue' }}>
            2
          </div>
          <div style={{ width: '40vw', height: '20vh', background: 'green' }}>
            3
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
