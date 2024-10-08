import styled from 'styled-components';
import { COLORS } from '../../constants';

export const CustomInputContainer = styled.input`
  padding-left: 21px;

  &:focus {
    border: 1px solid ${COLORS.DARKGRAPEFRUIT} !important;
    outline: none;
  }

  &::placeholder {
    color: ${COLORS.TAG};
  }
`;

export const CustomSearchInputContainer = styled.input`
  padding-left: 3vw;
  border-radius: 50px;
  transition: border-color 0.3s;

  &:focus {
    border: 1px solid ${COLORS.DARKGRAPEFRUIT} !important;
    outline: none;
  }

  &::placeholder {
    color: ${COLORS.TAG};
  }
`;

export const CustomTextareaContainer = styled.textarea`
  font-family: 'Happiness-Sans-Regular';

  &:focus {
    border: 1px solid ${COLORS.DARKGRAPEFRUIT} !important;
    outline: none;
  }
`;

export const CharacterCountContainer = styled.div`
  bottom: 5px;
  padding-left: 330px;
  font-size: 0.8vw;
  color: ${COLORS.GRAY};
`;
