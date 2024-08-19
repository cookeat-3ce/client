import { forwardRef } from 'react';
import styled from 'styled-components';
import { colors } from '../../constants';
export const SideBar = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  margin-top: 24px;
  width: 230px;
  height: 900px;
  border-radius: 0 20px 20px 0;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  background: ${colors.white};
  font-family: 'Happiness-Sans-Bold';
  font-size: 20px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 51px;
  padding-right: 50px;
`;

const StyledButtonContainer = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['isTopSpecial', 'isBottomSpecial', 'isActive'].includes(prop),
})`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 5px;
  margin-right: 6px;
  width: 219px;
  height: 50px;
  margin-top: ${(props) => (props.isTopSpecial ? '20px' : '0')};
  margin-bottom: ${(props) => (props.isBottomSpecial ? '0' : '10px')};
  background-color: ${(props) =>
    props.isActive ? colors.skyblue : 'transparent'};
  position: relative;
  border-radius: 100px;

  &::after {
    cursor: default;
    pointer-events: none;
    content: '';
    display: ${(props) => (props.isBottomSpecial ? 'block' : 'none')};
    position: absolute;
    bottom: ${(props) => (props.isBottomSpecial ? '-10px' : 'auto')};
    left: 0;
    width: 200px;
    height: 2px;
    background-color: rgba(1, 33, 64, 0.5);
    margin-left: 10px;
    margin-right: -9px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  margin-left: 18px;
  align-items: center;
  gap: 8px;
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
