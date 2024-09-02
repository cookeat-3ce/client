import styled from 'styled-components';
import { COLORS } from '../../constants';
import { Switch } from 'antd';

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1vh;
  margin-bottom: 5vh;
  justify-content: flex-end;
`;

export const StyledSwitch = styled(Switch)`
  width: 3.5vw;
  &.ant-switch-checked {
    background: ${COLORS.SUCCESS};
  }
  &.ant-switch-checked:hover:not(.ant-switch-disabled) {
    background: ${COLORS.SUCCESS};
  }
`;
export const DetailsContainer = styled.div`
  display: flex;
  width: 60vw;
  height: 80vh;
  margin-left: 7vw;
  border: 1px solid ${COLORS.TAG};
  border-radius: 20px;
`;

export const VideoContainer = styled.div`
  width: 50%;
  height: 80vh;
  border-right: 1px solid ${COLORS.BLACK};
`;

export const WriteContainer = styled.div`
  width: 50%;
  height: 100%;
`;
