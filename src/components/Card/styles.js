import styled from 'styled-components';

export const Container = styled.div`
  height: ${(props) => props.height || '45vh'};
  position: relative;
  transition: transform 0.3s ease;
`;

export const Overlay = styled.div`
  position: absolute;
  width: 91%;
  height: 95%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
