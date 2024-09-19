import styled from 'styled-components';
import { COLORS } from '../../constants';

export const Container = styled.div`
  width: 74vw;
  display: flex;
  flex-direction: column;
  // border: 10px solid BLACK;
`;

export const EventTitleContainer = styled.div`
  // border: 10px solid GREEN;
`;

export const EventTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2vh 4vw;
  // border: 10px solid RED;
`;

export const EventInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  // border: 10px solid RED;
`;

export const TitleSeparator = styled.hr`
  border: none;
  border-top: 2px solid ${COLORS.STROKE};
  margin: 0.6vh 1.2vw;
`;

export const ListButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin: 1vh 1vw;
  // border: 10px solid BLUE;
`;
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2vh;
  margin: 0 0 4vh 0;
  // border: 10px solid RED;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2vh;
  border: 10px solid BLACK;
`;

export const EventImage = styled.img`
  width: 32vw;
  // height: 32vh;
  object-fit: contain;
`;
