import React from 'react';
import { Container } from './styles';
/**
 * 공통 버튼
 *
 * @author 양재혁
 * @version 1.0
 * @since 2024.08.28
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.08.28    양재혁       최초 생성
 * </pre>
 */
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
