import styled from 'styled-components';

export const Container = styled.div`
  //   border: 10px solid BLACK;
  display: flex;
  flex-direction: column;
  height: auto;
  width: 74vw;
`;

export const PageTitleContainer = styled.div`
  display: flex;
  align-items: end;
  gap: 1vw;
  margin: 2vh 0;
  // border: 10px solid GREEN;
`;

export const ContentContainer = styled.div`
  display: flex;
  margin: 2vh 0;
  // border: 10px solid RED;
`;

export const SskcookContainer = styled.div`
  margin: 0 2vw 0 0;
  //   border: 10px solid black;
`;

export const NoIngredientAlertContainer = styled.div`
  width: 74vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2vh;
  //   border: 10px solid GREEN;
`;

export const FridgeImageWrapper = styled.img`
  width: 8vw;
`;
