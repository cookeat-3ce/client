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
}) => {
  const style = {
    color: color,
    width: width,
    height: height,
    backgroundColor: backgroundColor,
    border: `1px solid ${borderColor}`,
    fontSize: fontSize,
    fontFamily: 'Happiness-Sans-Bold',
    borderRadius: '100px',
  };

  return (
    <Container style={style} onClick={onClick} disabled={disabled}>
      {text}
    </Container>
  );
};

export default CustomButton;
