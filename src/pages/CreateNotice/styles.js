import styled from 'styled-components';
import { COLORS } from '../../constants';

export const Container = styled.div`
  width: 70vw;
  display: flex;
  flex-direction: column;
  margin: 0 2vw;
  // border: 10px solid ${COLORS.ORANGE};
`;

export const PageTitleContainer = styled.div`
  margin: 2vh 0;
  // border: 10px solid BLACK;
`;

export const ContentContainer = styled.div`
  // border: 10px solid ${COLORS.GREEN};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4vh 0 0 0;
  gap: 2vh;
  // border: 10px solid BLACK;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5vh;
  gap: 2vw;
  // border: 10px solid BLACK;
`;
