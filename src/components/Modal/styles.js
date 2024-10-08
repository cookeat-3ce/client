import styled from 'styled-components';

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

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 4vh 4vw;
  border-radius: 10px;
  max-width: 32vw;
  width: 100%;
`;

export const ModalTitleContainer = styled.div`
  display: flex;
  width: 50%;
  margin: 2vh 0;
  align-items: center;
  justify-content: center;
  //   border: 10px solid black;
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  margin: 2vh 0;
  //   border: 10px solid red;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2vh 0 0 0;
  //   border: 10px solid green;
`;

export const ErrorStateContainer = styled.div`
  width: 80%;
  justify-content: left;
`;
