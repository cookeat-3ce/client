import styled from 'styled-components';
import { COLORS } from '../../constants';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vw;
  height: 75vh;
  background-color: ${COLORS.WHITE};
  border-radius: 10px;
  border: 2px solid ${COLORS.TAG};
`;

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 10vh;
`;

export const LoginTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Happiness-Sans-Bold';
  font-size: 1.5vw;
`;

export const ErrorLoginTextContainer = styled.div`
  margin: 0 auto;
  font-family: 'Happiness-Sans-Regular';
  font-size: 1vw;
  margin-top: 5vh;
  color: ${COLORS.ORANGE};
`;

export const InputUsernameContainer = styled.div`
  margin-top: 5vh;
`;

export const InputPasswordContainer = styled.div`
  margin-top: 4vh;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4vh;
`;

export const SignUpTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5vw;
  margin-top: 2.5vw;
`;
