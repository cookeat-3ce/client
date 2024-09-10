import React, { useCallback } from 'react';
import { Container } from './styles';
import { useMutation } from '@tanstack/react-query';
import { memberAPI } from '../../../apis/member';
import { deleteAllCookies } from '../../../hooks';
import { useCustomNavigate } from '../../../hooks';
import { memberState } from '../../../store';
import { useResetRecoilState } from 'recoil';
import { debounce } from 'lodash';
import CustomTextButton from '../../Button/Text';
const AdminSidebar = () => {
  const resetMemberState = useResetRecoilState(memberState);
  const { handleChangeUrl } = useCustomNavigate();
  const mutation = useMutation({
    mutationFn: async () => {
      await memberAPI.logoutAPI();
    },
    onSuccess: () => {
      resetMemberState();
      deleteAllCookies();
      handleChangeUrl('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const debouncedLogout = useCallback(
    debounce(() => {
      mutation.mutate();
    }, 300),
    [],
  );
  return (
    <Container>
      e
      <CustomTextButton
        text={'메인'}
        onClick={() => handleChangeUrl('/admin')}
      ></CustomTextButton>
      <CustomTextButton
        text={'밀키트 선정'}
        onClick={() => handleChangeUrl('/admin/alarm')}
      ></CustomTextButton>
      <CustomTextButton
        text={'신고'}
        onClick={() => handleChangeUrl('/admin/report')}
      ></CustomTextButton>
      <CustomTextButton
        text={'크리에이터 인증 요청'}
        onClick={() => handleChangeUrl('/admin/verify')}
      ></CustomTextButton>
      <CustomTextButton text={'로그아웃'} onClick={debouncedLogout} />
    </Container>
  );
};

export default AdminSidebar;
