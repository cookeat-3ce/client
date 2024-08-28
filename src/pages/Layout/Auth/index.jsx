import React from 'react';
import './styles';
import CustomHeader from '../../../components/Header';
import { useScrollUp } from '../../../hooks';
import { Container, ContentContainer, CustomContents } from './styles';

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
