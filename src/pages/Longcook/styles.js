import styled from 'styled-components';
import { COLORS } from '../../constants';
import { Select as AntdSelect } from 'antd';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  display: flex;
  width: 100%;
  margin-left : 10vh;
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin-top : 3.5vh;
`;

export const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 2vh;
  margin : 2vh 0px;
  width : 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width : 100%;
`;

export const TitleContainer = styled.div`
  margin-top: 3vh;
`;

export const SubTitleContainer = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 2.5vh;
`;

export const UploadButtonWrapper = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin-top: -0.8vh;
`;

export const CustomInputWrapper = styled.div`
  margin-top: 2vh;
`;

export const IngredientsContainer = styled.div`
  margin-top: 3vh;
`;

export const IngredientsInputWrapper = styled.div`
  display: flex;
  margin-top: 3vh;
  gap: 10px;
`;

export const AddButtonWrapper = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin-top: -0.5vh;
`;

export const RecipeContainer = styled.div`
  margin-top: 1vh;
`;

export const VideoPreviewContainer = styled.div`
  width: 120vh;
  height: 50vh;
  border: 1px solid #f0f0f0; /* 테두리 색상 */
  border-radius: 5px; /* 테두리 둥글기 */
  background-color: ${COLORS.LIGHT_GRAY}; /* 배경색 */
  display: flex;
  align-items: center;
  justify-content: center;ㅜ
`;

export const VideoPreview = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 비디오가 컨테이너에 맞도록 조정 */
  border: 1px solid #f0f0f0; /* 테두리 색상 */
  border-radius: 5px;
  display: ${({ file }) => (file ? 'block' : 'none')}; /* 파일이 없을 때 비디오 숨기기 */
`;

export const PlaceholderText = styled.p`
  color: ${COLORS.GRAY};
  font-size: .8vw;
  text-align: center;
  display: ${({ file }) => (file ? 'none' : 'block')}; /* 파일이 있을 때 텍스트 숨기기 */
`;


export const IngredientsListContainer = styled.div`
    margin-top: 2vh;
    margin-left : 1vh;
    margin-bottom : 3vh;
`;

export const RemoveButton = styled.span`
  margin-left: 10px;
  cursor: pointer;
  color: ${COLORS.DARKGRAPEFRUIT};
  font-size: 1vw;
`;

export const IngredientItem = styled.div`
    font-family: 'Happiness-Sans';
    font-size: 1vw;
    color: ${COLORS.BLACK};
    margin-bottom: 1vh;
`;


export const SubmitButtonWrapper = styled.div`
  margin-top : 3.5vh;
  margin-bottom : 2vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
