import { forwardRef } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants';
export const SideBar = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  margin-top: 2vh;
  width: 15vw;
  height: 87vh;
  border-radius: 0 20px 20px 0;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  background: ${COLORS.WHITE};
  font-family: 'Happiness-Sans-Bold';
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 111;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 4vh;
  padding-right: 3vw;
`;

const StyledButtonContainer = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['isTopSpecial', 'isBottomSpecial', 'isActive'].includes(prop),
})`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 1vh;
  margin-right: 1vh;
  width: 14vw;
  height: 7vh;
  margin-top: ${(props) => (props.isTopSpecial ? '2vh' : '0')};
  margin-bottom: ${(props) => (props.isBottomSpecial ? '0' : '1vh')};
  background-color: ${(props) =>
    props.isActive ? COLORS.SKYBLUE : 'transparent'};
  position: relative;
  border-radius: 100px;

  &::after {
    cursor: default;
    pointer-events: none;
    content: '';
    display: ${(props) => (props.isBottomSpecial ? 'block' : 'none')};
    position: absolute;
    bottom: ${(props) => (props.isBottomSpecial ? '-1vh' : 'auto')};
    left: 0;
    width: 12vw;
    height: 0.2vh;
    background-color: rgba(1, 33, 64, 0.5);
    margin-left: 1vw;
    margin-right: -1vw;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  margin-left: 1vw;
  align-items: center;
  gap: 1vw;
  justify-content: center;
`;
export const ButtonContainer = forwardRef(
  ({ isTopSpecial, isBottomSpecial, ...rest }, ref) => (
    <StyledButtonContainer
      ref={ref}
      isTopSpecial={isTopSpecial}
      isBottomSpecial={isBottomSpecial}
      {...rest}
    />
  ),
);

export const LogoutContainer = styled.div`
  display: flex;
  margin-left: 1vw;
  margin-bottom: 1vw;
`;
