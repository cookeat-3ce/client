import styled from 'styled-components';
import { COLORS } from '../../constants';

export const Container = styled.div`
  width: 72vw;
  // border: 10px solid BLACK;
`;

export const PageTitleContainer = styled.div`
  margin: 2vh 0;
  // border: 10px solid BLACK;
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4vh 0 0 0;
  // border: 10px solid GREEN;
`;

export const EventListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two columns */
  column-gap: 8vw;
  row-gap: 4vh;
`;

export const EventContainer = styled.div`
  display: flex;
  height: 16vh;
  gap: 1vw;
  align-items: center;
  // border: 10px solid RED;
`;

export const EventThumbnailImage = styled.img`
  width: 16vw;
  cursor: pointer;
`;

export const EventInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8vh;
  // border: 10px solid BLACK;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 4vh 0;
  gap: 0.8vw;
`;

export const PaginationButton = styled.button`
  display: flex;
  background-color: ${({ active }) => (active ? COLORS.ORANGE : COLORS.WHITE)};
  color: ${({ active }) => (active ? COLORS.WHITE : COLORS.ORANGE)};
  border: ${({ active }) => (active ? 'none' : 'solid 1px rgba(0, 0, 0, 0)')};
  cursor: pointer;
  border-radius: 20px;
  width: 2.4vw;
  height: 4vh;
  justify-content: center;
  align-items: center;
  font-size: 1rem;

  &:hover {
    border: solid 1px ${({ active }) => !active && COLORS.LIGHTORANGE};
  }
`;

export const MoveButton = styled.button`
  display: flex;
  background-color: ${COLORS.WHITE};
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;

  &:hover {
    text-decoration: underline;
  }
`;
