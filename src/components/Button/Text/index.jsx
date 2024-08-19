import React from 'react';

const CustomTextButton = ({ text, onClick, color, fontSize }) => {
  const styles = {
    color: color,
    fontSize: fontSize,
    cursor: 'pointer',
    fontFamily: 'Happiness-Sans-Bold',
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
