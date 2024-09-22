import React from 'react';
import { Container } from './styles';

/**
 * 사용자 프로필 이미지
 *
 * @author 김지수
 * @version 1.0
 * @since 2024.08.31
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.08.31    김지수       최초 생성
 * </pre>
 */
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
