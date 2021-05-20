import React from 'react';

const PopupLayer = props => (
  <div
    style={{
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      margin: 'auto',
      zIndex: 1,
      backgroundColor: 'rgba(0,0,0, 0.5)'
    }}
  >
    <div
      style={{
        position: 'absolute',
        height: '500px',
        left: '15%',
        right: '15%',
        top: '100px',
        margin: 'auto',
        borderRadius: '10px',
        background: 'white'
      }}
    >
      {props.children}
    </div>
  </div>
);

export default PopupLayer;
