import React from 'react';
/**
 * 공통 텍스트
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
