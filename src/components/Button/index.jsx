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
  marginTop,
  fontWeight,
}) => {
  const style = {
    // cneter 정렬
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: color,
    width: width,
    height: height,
    backgroundColor: backgroundColor,
    border: `2px solid ${borderColor}`,
    fontSize: fontSize,
    fontFamily: fontFamily,
    borderRadius: borderRadius,
    marginTop: marginTop,
    fontWeight: fontWeight,
    cursor: disabled ? 'default' : 'pointer',
  };

  return (
    <Container style={style} onClick={onClick} disabled={disabled}>
      {text}
    </Container>
  );
};

export default CustomButton;
