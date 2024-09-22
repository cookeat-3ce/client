import React from 'react';
import PropTypes from 'prop-types';
/**
 * 이미지 버튼
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
const CustomImageButton = ({
  src,
  width,
  height,
  onClick,
  alt = '',
  style = {},
}) => {
  const defaultStyle = {
    width: width,
    height: height,
    cursor: 'pointer',
    borderRadius: '50%',
    objectFit: 'fill',
    ...style,
  };

  return <img src={src} style={defaultStyle} onClick={onClick} alt={alt} />;
};

CustomImageButton.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  alt: PropTypes.string,
};

export default CustomImageButton;
