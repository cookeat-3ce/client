import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1vh 0;
  // border: 10px solid black;
`;

export const SskcookContainer = styled.div`
  // display: flex;
  // flex-wrap: wrap;
  // gap: 25px;
  // margin-top: 16px;
  // width: 100%;
  // flex-wrap: wrap;

  // > * {
  //   width: 10vw;
  //   height: 100%;
  // }
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2vh;
  margin: 2vh 0;
  width: 100%;
`;

export const LongcookContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2vh;
  margin: 2vh 0;
  width: 100%;
  & > div {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  & > div {
    overflow: hidden;
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;
