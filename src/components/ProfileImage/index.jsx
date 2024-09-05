import React from 'react';
import { Container } from './styles';

const ProfileImage = ({ src, width, height, onClick, borderRadius }) => {
  const style = {
    width: width,
    height: height,
    borderRadius: borderRadius,
    objectFit: 'cover',
    cursor: 'pointer',
  };

  return <Container src={src} style={style} onClick={onClick}></Container>;
};

export default ProfileImage;
