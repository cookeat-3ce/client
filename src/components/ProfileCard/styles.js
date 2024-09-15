import styled from 'styled-components';
import { COLORS } from '../../constants';

export const Container = styled.div`
  margin-top: 0.5vh;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

export const Overlay = styled.div`
  position: absolute;
  width: 90%;
  height: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TitleContainer = styled.div`
  margin-top: 1vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 72%;
  gap: 10px;
`;

export const ProfileContainer = styled.div`
  margin-top: 1vh;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

export const TitleText = styled.div`
  font-family: 'Happiness-Sans-Bold';
  font-size: 1vw;
  color: ${COLORS.BLACK};
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
`;

export const NicknameText = styled.div`
  font-family: 'Happiness-Sans';
  font-size: 1vw;
  color: ${COLORS.LIGHTGRAY};
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
`;
