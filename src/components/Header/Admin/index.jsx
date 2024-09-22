import React from 'react';
import {
  ButtonContainer,
  Container,
  CenterWrapper,
  LogoContainer,
  Header,
} from './styles';
import CustomTextButton from '../../Button/Text';
import CustomImageButton from '../../Button/Image';
import { COLORS } from '../../../constants';
import { getCookie, useCustomNavigate } from '../../../hooks';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { memberState } from '../../../store';
/**
 * 어드민 헤더
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
const AdminHeader = () => {
  const accessToken = getCookie('accessToken');
  const { handleChangeUrl } = useCustomNavigate();
  const location = useLocation().pathname;
  const persist = useRecoilValue(memberState);
  return (
    <Header>
      <Container>
        <CenterWrapper>
          <LogoContainer
            onClick={() => {
              handleChangeUrl('/');
            }}
            style={{ cursor: 'pointer' }}
          />
        </CenterWrapper>
        <ButtonContainer>
          {accessToken ? (
            <CustomImageButton
              src={persist.profileImage}
              width="5vh"
              height="5vh"
              onClick={() => {
                handleChangeUrl('/info');
              }}
            />
          ) : location === '/login' ? (
            <>
              <CustomTextButton
                fontSize={'1.1vw'}
                color={COLORS.BLACK}
                onClick={() => handleChangeUrl('/login')}
                style={{ display: 'none' }}
              />
              <CustomTextButton
                text={'회원가입'}
                fontSize={'1.1vw'}
                color={COLORS.BLACK}
                onClick={() => handleChangeUrl('/signup')}
              />
            </>
          ) : location === '/signup' ? (
            <>
              <CustomTextButton
                fontSize={'1.1vw'}
                color={COLORS.BLACK}
                style={{ display: 'none' }}
              />
              <CustomTextButton
                text={'로그인'}
                fontSize={'1.1vw'}
                color={COLORS.BLACK}
                onClick={() => handleChangeUrl('/login')}
              />
            </>
          ) : (
            <>
              <CustomTextButton
                text={'로그인'}
                fontSize={'1.1vw'}
                color={COLORS.BLACK}
                onClick={() => handleChangeUrl('/login')}
              />
              <CustomTextButton
                text={'회원가입'}
                fontSize={'1.1vw'}
                color={COLORS.BLACK}
                onClick={() => handleChangeUrl('/signup')}
              />
            </>
          )}
        </ButtonContainer>
      </Container>
    </Header>
  );
};

export default AdminHeader;
