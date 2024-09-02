import React from 'react';
import './styles';
import {
  ButtonContainer,
  Container,
  CenterWrapper,
  LogoContainer,
  Header,
} from './styles';
import AlarmIcon from '../../assets/icons/alarm.svg';
import CustomTextButton from '../Button/Text';
import CustomImageButton from '../Button/Image';
import { COLORS } from '../../constants';
import { getCookie, useCustomNavigate } from '../../hooks';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { memberState } from '../../store';
const CustomHeader = () => {
  // 예시
  const handleClick = () => console.log(1);

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
            <>
              <CustomImageButton
                src={AlarmIcon}
                width="3vh"
                height="3vh"
                onClick={handleClick}
              />
              <CustomImageButton
                src={persist.profileImage}
                width="5vh"
                height="5vh"
                onClick={() => {
                  handleChangeUrl('/info');
                }}
              />
            </>
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

export default CustomHeader;
