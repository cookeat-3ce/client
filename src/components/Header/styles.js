import styled from 'styled-components';
import { COLORS } from '../../constants';

// 예시
const logo = require('../../assets/icons/search.png');

export const Header = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  font-family: 'Happiness-Sans-Bold';
`;
export const Container = styled.div`
  display: flex;
  width: 90vw;
  height: 9vh;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  max-width: 100vw;
  background-color: ${COLORS.YELLOW};
  border-radius: 0px 0 20px 20px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  position: relative;
`;

export const CenterWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const LogoContainer = styled.div`
  width: 2vh;
  height: 2vh;
  background-image: url(${logo});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  gap: 2vw;
  right: 2vw;
`;
