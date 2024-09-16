import styled from 'styled-components';
import { COLORS } from '../../constants';

export const Container = styled.div`
  // height: 16vh;
  padding: 2vh 2vw;
  display: flex;
  justify-content: space-between;
  border: 2px solid ${COLORS.STROKE};
  border-radius: 20px 20px / 20px 20px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  gap: 2vh;
  // border: 5px solid RED;
`;

export const TitleWrapper = styled.div`
  margin: 0 2vw;
  // border: 5px solid RED;
`;

export const ContentWrapper = styled.div`
  margin: 0 2vw;
  line-height: 2vh;
  // border: 5px solid BLACK;
`;

export const ImageButtonWrapper = styled.div`
  margin: 2vh 1.5vw 0 2vw;
  // border: 5px solid BLACK;
`;
