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
const CustomHeader = ({ isLogined }) => {
  // 예시
  const handleClick = () => console.log(1);
  // isLogined = false;
  isLogined = true;

  return (
    <Header>
      <Container>
        <CenterWrapper>
          <LogoContainer />
        </CenterWrapper>
        <ButtonContainer>
          {isLogined ? (
            <>
              <CustomImageButton
                src={AlarmIcon}
                width="50px"
                height="50px"
                onClick={handleClick}
              />
              <CustomImageButton
                src={ExampleProfile}
                width="80px"
                height="80px"
                onClick={handleClick}
              />
            </>
          ) : (
            <>
              <CustomTextButton
                text={'로그인'}
                fontSize={26}
                color={COLORS.NAVY}
                onClick={handleClick}
              />
              <CustomTextButton
                text={'회원가입'}
                fontSize={26}
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
