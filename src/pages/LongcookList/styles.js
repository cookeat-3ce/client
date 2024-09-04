import styled from 'styled-components';
import { COLORS } from '../../constants';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;

export const TextContainer = styled.div`
  display: flex;
  gap: 0.5vw;
  margin-bottom : 3vh;
`;

export const SkeletonContainer = styled.div`
  display: flex;
  width: 90vw;
  gap: 50px;
  flex-wrap: wrap;
`;

export const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20vh;
`;

export const InputContainer = styled.div`
  margin-top : 1vh;
  margin-bottom : 5vh;
  margin-left: 48vw;
`

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CardWrapper = styled.div`
  width: 20vw;
  height : 10vh;
`;


export const TitleContainer = styled.div`
  margin-top: 1vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const TitleText = styled.div`
  font-family: 'Happiness-Sans-Bold';
  font-size: 1vw;
  color: ${COLORS.BLACK};
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
`;

export const NicknameText = styled.div`
  font-family: 'Happiness-Sans';
  font-size: 1vw;
  color: ${COLORS.LIGHTGRAY};
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 30%;
`;