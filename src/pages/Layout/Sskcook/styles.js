import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentContainer = styled.div`
  display: flex;
`;

export const CustomContents = styled.div`
  margin-top: 5vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 5vw;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;
  height: 150vh;
`;
