import React from 'react';
import { Container, ContentContainer, CustomContents } from './styles';
import { useScrollUp } from '../../../hooks';
import AdminHeader from '../../../components/Header/Admin';
import AdminSidebar from '../../../components/SideBar/Admin';
/**
 * 어드민 레이아웃
 *
 * @author 양재혁
 * @version 1.0
 * @since 2024.09.11
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.09.11    양재혁       최초 생성
 * </pre>
 */
const AdminLayout = ({ children }) => {
  useScrollUp();
  return (
    <Container>
      <AdminHeader />
      <ContentContainer>
        <AdminSidebar />
        <CustomContents>{children}</CustomContents>
      </ContentContainer>
    </Container>
  );
};

export default AdminLayout;
