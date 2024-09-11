import styled, { keyframes } from 'styled-components';
import { COLORS } from '../../constants';

// 예시
const logo = require('../../assets/icons/logo.svg').default;

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

export const NotificationDropdown = styled.div`
  position: absolute;
  top: 5vh;
  right: 4vw;
  width: 20vw;
  background-color: ${COLORS.WHITE};
  border: 1px solid ${COLORS.ORANGE};
  display: ${({ show }) => (show ? 'block' : 'none')};
  z-index: 101;
`;

export const NotificationItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  padding: 1rem;
  border-bottom: 1px solid ${COLORS.LIGHTGRAY};
  &:last-child {
    border-bottom: none;
  }
`;

export const NoNotifications = styled.div`
  padding: 1rem;
  text-align: center;
  color: ${COLORS.GRAY};
`;

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOutRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  position: fixed;
  top: 12vh;
  right: 2vw;
  width: 20vw;
  padding: 2vh 2vw;
  background-color: ${COLORS.WHITE};
  border: 1px solid ${COLORS.ORANGE};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 9999;
  animation: ${({ isVisible }) => (isVisible ? slideInRight : slideOutRight)}
    0.5s forwards;
`;
