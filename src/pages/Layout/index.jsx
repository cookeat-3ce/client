import React from 'react';
import './styles';
import CustomHeader from '../../components/Header';
import CustomSideBar from '../../components/SideBar';
import { Container, ContentContainer, CustomContents } from './styles';
import { useScrollUp } from '../../hooks';
const CommonLayout = ({ isLogined, children }) => {
  useScrollUp();
  return (
    <Container>
      <CustomHeader isLogined={isLogined} />
      <ContentContainer>
        <CustomSideBar isLogined={isLogined} />
        <CustomContents>{children}</CustomContents>
      </ContentContainer>
    </Container>
  );
};

export default CommonLayout;
