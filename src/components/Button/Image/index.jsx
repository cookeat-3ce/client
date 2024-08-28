import React from 'react';
import PropTypes from 'prop-types';

const CustomImageButton = ({ src, width, height, onClick, alt = '' }) => {
  const style = {
    width: width,
    height: height,
    cursor: 'pointer',
    borderRadius: '50%',
    objectFit: 'cover',
  };

  return <img src={src} style={style} onClick={onClick} alt={alt} />;
};

CustomImageButton.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  alt: PropTypes.string,
};

export default CustomImageButton;
