import React from 'react';

const CustomText = ({ fontFamily, fontSize, color, text }) => {
  const style = {
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: color,
  };
  return <div style={style}>{text}</div>;
};

export default CustomText;
