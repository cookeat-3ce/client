import React from 'react';
import './styles';
import CustomHeader from '../../../components/Header';
import { useScrollUp } from '../../../hooks';
import { Container, ContentContainer, CustomContents } from './styles';
/**
 * 로그인 / 회원가입 레이아웃
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
const AuthLayout = ({ children }) => {
  useScrollUp();
  return (
    <Container>
      <CustomHeader />
      <ContentContainer>
        <CustomContents>{children}</CustomContents>
      </ContentContainer>
    </Container>
  );
};

export default AuthLayout;
