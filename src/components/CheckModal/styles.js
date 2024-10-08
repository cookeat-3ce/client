import styled from 'styled-components';
import { COLORS } from '../../constants';

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2vh 0 0 0;
  // border: 10px solid BLACK;
`;

export const NeedVerifiedInfoImage = styled.img`
  width: 80%;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 4vh 4vw;
  border-radius: 10px;
  max-width: 25vw;
  width: 100%;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 3vh;
  margin: 4vh 0 2vh 0;
  gap: 2vh;
`;

export const TitleSeparator = styled.hr`
  border: none;
  border-top: 2px solid ${COLORS.STROKE};
  width: 120%;
  margin: 0 1.2vw;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2vh 0 0 0;
  gap: 2vw;
`;
