import React from 'react';
import { Container } from './styles';

const CustomButton = ({
  text,
  color,
  width,
  height,
  backgroundColor,
  fontSize,
  onClick,
  borderColor,
  disabled,
  fontFamily,
  borderRadius,
  fontWeight,
}) => {
  const style = {
    color: color,
    width: width,
    height: height,
    backgroundColor: backgroundColor,
    border: `2px solid ${borderColor}`,
    fontSize: fontSize,
    fontFamily: fontFamily,
    borderRadius: borderRadius,
    fontWeight: fontWeight,
  };

  return (
    <Container style={style} onClick={onClick} disabled={disabled}>
      {text}
    </Container>
  );
};

export default CustomButton;
