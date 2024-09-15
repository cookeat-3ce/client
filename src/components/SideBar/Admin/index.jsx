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
import { useLocation } from 'react-router-dom';
import { COLORS } from '../../../constants';
const AdminSidebar = () => {
  const location = useLocation();
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
      <CustomTextButton
        text={'메인'}
        onClick={() => handleChangeUrl('/admin')}
        color={location.pathname === '/admin' ? COLORS.ORANGE : COLORS.BLACK}
      ></CustomTextButton>
      <CustomTextButton
        text={'밀키트 선정'}
        onClick={() => handleChangeUrl('/admin/alarm')}
        color={
          location.pathname === '/admin/alarm' ? COLORS.ORANGE : COLORS.BLACK
        }
      ></CustomTextButton>
      <CustomTextButton
        text={'이벤트 등록'}
        onClick={() => handleChangeUrl('/admin/event')}
        color={
          location.pathname === '/admin/event' ? COLORS.ORANGE : COLORS.BLACK
        }
      ></CustomTextButton>
      <CustomTextButton
        text={'신고'}
        onClick={() => handleChangeUrl('/admin/report')}
        color={
          location.pathname === '/admin/report' ? COLORS.ORANGE : COLORS.BLACK
        }
      ></CustomTextButton>
      <CustomTextButton
        text={'크리에이터 인증 요청'}
        onClick={() => handleChangeUrl('/admin/verify')}
        color={
          location.pathname === '/admin/verify' ? COLORS.ORANGE : COLORS.BLACK
        }
      ></CustomTextButton>
      <CustomTextButton text={'로그아웃'} onClick={debouncedLogout} />
    </Container>
  );
};

export default AdminSidebar;
