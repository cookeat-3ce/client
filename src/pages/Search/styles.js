import styled from 'styled-components';
import { Skeleton, Tabs } from 'antd';
import { COLORS } from '../../constants';
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3vw;
  width: 70vw;
`;

export const TabsContainer = styled.div`
  margin-top: 7vh;
`;

export const StyledTabs = styled(Tabs)`
  .ant-tabs-tab-btn {
    color: ${COLORS.GRAY};
    font-family: 'Happiness-Sans-Regular', sans-serif;
    font-size: 1.2vw;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${COLORS.BLACK};
    font-family: 'Happiness-Sans-Bold', sans-serif;
    font-size: 1.2vw;
    text-shadow: none;
  }

  .ant-tabs-tab + .ant-tabs-tab {
    margin: 0 0 0 5vw;
  }

  .ant-tabs-ink-bar {
    position: absolute;
    background: ${COLORS.BLACK} !important;
    pointer-events: none;
  }
`;

export const Inner = styled.div``;

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
  width: 3.5vw;
  height: 4vw;
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
