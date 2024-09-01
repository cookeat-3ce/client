import React from 'react';
import PropTypes from 'prop-types';

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
