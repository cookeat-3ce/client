import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1vh 0;
  // border: 10px solid black;
`;

export const SskcookContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  margin-top: 16px;
  width: 100%;

  > * {
    width: 10vw;
    height: 100%;
  }
`;

export const LongcookContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 2vh 0;
  width: 100%;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;
