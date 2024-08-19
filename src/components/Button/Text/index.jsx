import React from 'react';

const CustomTextButton = ({ text, fontWeight, onClick, color, fontSize }) => {
  const styles = {
    fontWeight: fontWeight,
    color: color,
    fontSize: fontSize,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    textAlign: 'center',
  };

  return (
    <span onClick={onClick} style={styles}>
      {text}
    </span>
  );
};

export default CustomTextButton;
