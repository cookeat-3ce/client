import styled from 'styled-components';
import { COLORS } from '../../constants';
import { Skeleton, Switch } from 'antd';

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1vh;
  justify-content: flex-end;
  position: relative;
  top: -2.5vh;
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
  position: relative;
  width: 50%;
  height: 80vh;
  border-right: 1px solid ${COLORS.BLACK};
  background: ${COLORS.BLACK};
  cursor: pointer;
  border-radius: 20px 0 0 20px;
`;

export const WriteContainer = styled.div`
  width: 50%;
  margin-top: 3vh;
  margin-left: 3vh;
  overflow-y: auto;
  overflow-x: hidden;
  }
`;

export const TagContainer = styled.div`
  display: flex;
  gap: 1vw;
  margin-top: 3vh;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  text-decoration: underline;
`;

export const TagInner = styled.div`
  display: flex;
  align-items: center;
`;

export const IngredientContainer = styled.div`
  margin-top: 4vh;
`;

export const IngredientInner = styled.div`
  margin-top: 4vh;
  gap: 1vw;
  display: flex;
  flex-direction: column;
`;

export const IngredientWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1vw;
  width: 100%;
  box-sizing: border-box;
`;

export const IngredientSection = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LineContainer = styled.div`
  width: 27vw;
  height: 2px;
  background: ${COLORS.BLACK};
  margin-top: 7vh;
`;

export const RecipeContainer = styled.div`
  margin-top: 5vh;
`;

export const RecipeInner = styled(IngredientWrapper)`
  padding-right: 5vh;
  line-height: 1.5vw;
  overflow-wrap: break-word;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const SubscriptionContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 1;
  bottom: 5vw;
  left: 28vw;
  gap: 0.5vw;
`;

export const StyledSkeleton = styled(Skeleton.Button)`
  width: 100% !important;
  height: 100% !important;
  border-radius: 20px !important;
`;

export const SwitchSkeleton = styled(Skeleton.Button)`
  width: 100%;
  height: 100%;
`;
