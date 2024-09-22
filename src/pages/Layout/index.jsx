import React from 'react';
import './styles';
import CustomHeader from '../../components/Header';
import CustomSideBar from '../../components/SideBar';
import { Container, ContentContainer, CustomContents } from './styles';
import { useScrollUp } from '../../hooks';
/**
 * 메인 레이아웃
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
