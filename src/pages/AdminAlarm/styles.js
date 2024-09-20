import styled from 'styled-components';

export const Container = styled.div`
  width: 72vw;
  display: flex;
  flex-direction: column;
  gap: 2vh;
  //   border: 10px solid BLACK;
`;

export const PageTitleContainer = styled.div`
  display: flex;
  // border: 10px solid GREEN;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4vh 0;
  gap: 4vh;
  width: 100%;
  // border: 10px solid BLACK;
`;

export const EventContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2vw;
  // border: 10px solid RED;
`;

export const EventThumbnailImage = styled.img`
  width: 20vw;
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  opacity: ${({ disabled }) => disabled && '40%'};
`;

export const EventInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4vh;
  // border: 10px solid BLUE;
`;
