import styled from 'styled-components';
import { COLORS } from '../../constants';
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
`;

export const TextContainer = styled.div`
  display: flex;
  gap: 0.5vw;
`;

export const SkeletonContainer = styled.div`
  margin-top: 3vh;
  display: flex;
  width: 70vw;
  gap: 50px;
  flex-wrap: wrap;
`;

export const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 3vh;
`;
export const CardContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CardWrapper = styled.div`
  width: 10vw;
`;
