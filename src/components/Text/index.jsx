import React from 'react';

const CustomText = ({ fontFamily, fontSize, color, text, style }) => {
  const defaultStyle = {
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: color,
    whiteSpace: 'pre-line',
  };

  return <div style={{ ...defaultStyle, ...style }}>{text}</div>;
};

export default CustomText;
