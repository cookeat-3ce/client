import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PageTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 2vh 0;
  // border: 10px solid BLACK;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 2vh 0;
  gap: 2vw;
  // border: 10px solid GREEN;
`;

export const ContentContainer = styled.div`
  display: flex;
  margin: 2vh 0;
  width: 74vw;
  // border: 10px solid GREEN;
`;

export const LiveListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 4vw;
  row-gap: 4vh;
  // border: 10px solid BLACK;
`;

export const LiveContainer = styled.div`
  // border: 10px solid RED;
`;

export const LiveThumbnailImage = styled.img`
  width: 20vw;
  height: 20vh;
  object-fit: contain;
  cursor: pointer;
`;

export const LiveTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  // padding: 0 0.8vw;
  // margin: 0.8vh 0;
  cursor: pointer;
  // border: 10px solid RED;
`;

export const LiveTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3vw;
  // border: 10px solid black;
`;

export const ParticipantImage = styled.img``;
