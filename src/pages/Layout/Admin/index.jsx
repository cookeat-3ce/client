import React from 'react';
import { Container, ContentContainer, CustomContents } from './styles';
import { useScrollUp } from '../../../hooks';
import AdminHeader from '../../../components/Header/Admin';
import AdminSidebar from '../../../components/SideBar/Admin';
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
