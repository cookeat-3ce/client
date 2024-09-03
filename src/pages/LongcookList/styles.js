import styled from 'styled-components';

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

export const TitleContainer = styled.div`  // 새로 추가된 부분
  margin-top: 1vh;
  text-align: left;
  width: 100%;
`;