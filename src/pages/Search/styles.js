import styled from 'styled-components';
import { Skeleton, Tabs } from 'antd';
import { COLORS } from '../../constants';
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 72vw;
`;

export const InputContainer = styled.div`
  display: flex;
  margin: 2vh 0;
`;

export const TabsContainer = styled.div`
  margin: 2vh 0 0 0;
`;

export const StyledTabs = styled(Tabs)`
  .ant-tabs-tab-btn {
    color: ${COLORS.GRAY};
    font-family: 'Happiness-Sans-Regular', sans-serif;
    font-size: 1.2rem;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${COLORS.BLACK};
    font-family: 'Happiness-Sans-Bold', sans-serif;
    font-size: 1.2rem;
    text-shadow: none;
  }

  .ant-tabs-tab + .ant-tabs-tab {
    margin: 0 0 0 2vw;
  }

  .ant-tabs-ink-bar {
    position: absolute;
    background: ${COLORS.BLACK} !important;
    pointer-events: none;
  }
`;

export const Inner = styled.div`
  width: 100%;
`;

export const SortInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 1vw;
`;

export const ContentInner = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3vh;
  margin-left: 4vh;
  gap: 3vw;
`;

export const TagImage = styled.div`
  width: 2.5vw;
  height: 3vw;
  border-radius: 15px;
  background: ${COLORS.TAG};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileImageContainer = styled.img`
  width: 5vw;
  height: 5vw;
  border-radius: 50%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  objectfit: 'fill';
`;

export const TextContainer = styled.div``;

export const StyledTitleSkeleton = styled(Skeleton.Button)`
  width: 10vw !important;
  height: 2vw !important;
`;

export const StyledContentSkeleton = styled(Skeleton.Button)`
  width: 10vw !important;
  height: 1vw !important;
`;

export const StyledProfileSkeleton = styled(Skeleton.Avatar)`
  .ant-skeleton-avatar {
    width: 5vw !important;
    height: 5vw !important;
  }
`;

export const StyledCountSkeleton = styled(Skeleton.Button)`
  width: 10vw !important;
  height: 1vw !important;
`;

export const CardWrapper = styled.div`
  width: 25vw;
  positon: relative;
  // border: 10px solid red;
`;
