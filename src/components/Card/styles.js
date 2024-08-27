import styled from 'styled-components';
import { Skeleton } from 'antd';

export const Container = styled.div`
  height: 40vh;
  transition: transform 0.3s ease;
`;

export const StyledSskcookSkeleton = styled(Skeleton.Button)`
  width: 10vw !important;
  height: 40vh !important;
`;

export const StyledLongcookSkeleton = styled(Skeleton.Button)`
  width: 20vw !important;
  height: 30vh !important;
`;
