import styled from 'styled-components';
import { COLORS } from '../../constants';

// 예시
const logo = require('../../assets/icons/example_logo.png');

export const Header = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  font-family: 'Happiness-Sans-Bold';
  z-index: 100;
`;
export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 10vh;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  max-width: 100vw;
  background-color: ${COLORS.WHITE};
  box-shadow: 0px 2px 10px rgba(162, 162, 162, 0.2);
  position: relative;
`;

export const CenterWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const LogoContainer = styled.div`
  width: 10vw;
  height: 10vh;
  background-image: url(${logo});
  background-size: contain;
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
