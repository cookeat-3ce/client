import React from 'react';

const CustomTextButton = ({ text, onClick, color, fontSize, style }) => {
  const defaultStyles = {
    color: color,
    fontSize: fontSize,
    cursor: 'pointer',
    fontFamily: 'Happiness-Sans-Bold',
    backgroundColor: 'transparent',
    textAlign: 'center',
  };

  const combinedStyles = { ...defaultStyles, ...style };

  return (
    <div onClick={onClick} style={combinedStyles}>
      {text}
    </div>
  );
};

export default CustomTextButton;
