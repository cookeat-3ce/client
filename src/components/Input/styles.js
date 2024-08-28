import styled from 'styled-components';
import { COLORS } from '../../constants';

export const CustomInputContainer = styled.input`
  padding-left: 21px;

  &:focus {
    border: 1px solid ${COLORS.DARKGRAPEFRUIT} !important;
    outline: none;
  }
`;

export const CustomSearchInputContainer = styled.input`
  padding-left: 68px;
  border-radius: 100px;
  transition: border-color 0.3s;

  &:focus {
    border: 1px solid ${COLORS.DARKGRAPEFRUIT} !important;
    outline: none;
  }
`;
