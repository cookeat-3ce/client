import React from 'react';
import './styles';
import CustomHeader from '../../components/Header';
import CustomSideBar from '../../components/SideBar';
import { Container, ContentContainer, CustomContents } from './styles';
import { useScrollUp } from '../../hooks';
const CommonLayout = ({ children }) => {
  useScrollUp();
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

export default CommonLayout;
