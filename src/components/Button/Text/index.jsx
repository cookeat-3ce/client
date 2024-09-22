import React from 'react';
/**
 * 텍스트 버튼
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
const CustomTextButton = ({
  text,
  onClick,
  color,
  fontSize,
  style,
  fontFamily,
}) => {
  const defaultStyles = {
    color: color,
    fontSize: fontSize,
    cursor: 'pointer',
    fontFamily: fontFamily ? fontFamily : 'Happiness-Sans-Bold',
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
