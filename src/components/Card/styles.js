import styled from 'styled-components';

export const Container = styled.div`
  display: inline-block;
  width: 10vw;
  height: 40vh;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;
