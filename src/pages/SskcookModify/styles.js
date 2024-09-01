import styled from 'styled-components';
import { COLORS } from '../../constants';
import { Upload } from 'antd';
import { Select as AntdSelect } from 'antd';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
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
  margin-left : 15vh;
  margin-top : 4vh;
  width : 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width : 100%;
`;

export const TitleContainer = styled.div`
  margin-top: 4vh;
`;

export const SubTitleContainer = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 5vh;
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

export const HashtagContainer = styled.div`
  margin-top: 4vh;
`;

export const VideoPreviewContainer = styled.div`
  width: 350px;
  height: 500px;
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

export const Space = styled.div`
  width: 100%;
  direction: vertical;
`;

export const CustomSelect = styled(AntdSelect)`
  width: 100%;
  margin-top: 2vh;

  &.ant-select-focused .ant-select-selector {
    background-color: ${COLORS.DARKGRAY} !important;  // 원하는 포커스 색상으로 변경
    border-color: ${COLORS.DARKGRAPEFRUIT} !important;
  }
  
  &:hover .ant-select-selector {
    background-color: ${COLORS.DARKGRAY} !important; // 원하는 호버 색상으로 변경
    border-color: ${COLORS.DARKGRAPEFRUIT} !important;
  }


`;

export const SubmitButtonWrapper = styled.div`
  display : flex;
  margin-left : -8vh;
  gap : 10px;
`
