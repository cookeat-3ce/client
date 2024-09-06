import React from 'react';
import './styles';
import CustomHeader from '../../../components/Header';
import CustomSideBar from '../../../components/SideBar';
import { Container, ContentContainer, CustomContents } from './styles';
import { useScrollMiddle } from '../../../hooks';
const SskcookDetailLayout = ({ children }) => {
  useScrollMiddle();
  return (
    <Container>
      <CustomHeader />
      <ContentContainer>
        <CustomSideBar />
        <CustomContents>{children}</CustomContents>
      </ContentContainer>
    </Container>
  );
};

export default SskcookDetailLayout;
