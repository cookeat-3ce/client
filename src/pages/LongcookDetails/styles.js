import styled from 'styled-components';
import { COLORS } from '../../constants';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  display: flex;
  width: 100%;
`;

export const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 2vh;
  width: 100%;
`;

export const CustomWrapper = styled.div`
  margin-top: 3vh;
  margin-bottom: 4vh;
  margin-left: 4vw;
`;

export const SubTitleContainer = styled.div`
  display: flex;
  margin-top: 4vh;
  flex-direction: row;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 2vh;
`;

export const VideoPreviewContainer = styled.div`
  width: 100%;
  height: 64vh;
  border: 1px solid #f0f0f0; /* 테두리 색상 */
  border-radius: 5px; /* 테두리 둥글기 */
  background-color: ${COLORS.LIGHT_GRAY}; /* 배경색 */
  display: flex;
  align-items: center;
  justify-content: center;
  autoplay: true;
`;

export const VideoPreview = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 비디오가 컨테이너에 맞도록 조정 */
  border: 1px solid #f0f0f0; /* 테두리 색상 */
  border-radius: 5px;
  display: ${({ file }) =>
    file ? 'block' : 'none'}; /* 파일이 없을 때 비디오 숨기기 */
`;

export const IngredientsListContainer = styled.div`
  margin-top: 2vh;
  margin-bottom: 3vh;
`;

export const IngredientItem = styled.div`
  display: flex;
  width: 100%;
  font-family: 'Happiness-Sans';
  font-size: 1vw;
  color: ${COLORS.BLACK};
  margin-bottom: 1vh;
`;

export const BorderLine = styled.div`
  flex: 1;
  height: 0.4vh;
  margin: 0.4vw;
  background-color: ${COLORS.GRAPEFRUIT};
`;

export const IngredientSection = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const IngredientWrapper = styled.div`
  margin-top: 3vh;
  margin-bottom: 4vh;
  margin-left: 2vw;
  margin-right: 30vw;
`;
