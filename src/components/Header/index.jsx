import React from 'react';
import './styles';
import {
  ButtonContainer,
  Container,
  CenterWrapper,
  LogoContainer,
  Header,
} from './styles';
import AlarmIcon from '../../assets/icons/alarm.png';
import ExampleProfile from '../../assets/images/example_profile.jpg';
import CustomTextButton from '../Button/Text';
import CustomImageButton from '../Button/Image';
import { COLORS } from '../../constants';
import { getCookie } from '../../hooks';
const CustomHeader = () => {
  // 예시
  const handleClick = () => console.log(1);
  // isLogined = false;
  // isLogined = true;

  const accessToken = getCookie('accessToken');

  return (
    <Header>
      <Container>
        <CenterWrapper>
          <LogoContainer />
        </CenterWrapper>
        <ButtonContainer>
          {accessToken ? (
            <>
              <CustomImageButton
                src={AlarmIcon}
                width="4vh"
                height="4vh"
                onClick={handleClick}
              />
              <CustomImageButton
                src={ExampleProfile}
                width="7vh"
                height="7vh"
                onClick={handleClick}
              />
            </>
          ) : (
            <>
              <CustomTextButton
                text={'로그인'}
                fontSize={'1vw'}
                color={COLORS.NAVY}
                onClick={handleClick}
              />
              <CustomTextButton
                text={'회원가입'}
                fontSize={'1vw'}
                color={COLORS.NAVY}
                onClick={handleClick}
              />
            </>
          )}
        </ButtonContainer>
      </Container>
    </Header>
  );
};

export default CustomHeader;
