import styled from 'styled-components';
import { COLORS } from '../../constants';
import { Upload } from 'antd';
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  height: 75vh;
  background-color: rgba(255, 234, 117, 0.6);
  border-radius: 40px;
  border: 1px solid ${COLORS.TAG};
`;

export const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 10vh;
`;

export const SignUpTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Happiness-Sans-Bold';
  font-size: 1.5vw;
`;

export const Inner = styled.div`
  margin-top: 5vh;
  display: flex;
  align-items: center;
  width: 68vw;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5vh;
  width: 60%;
`;

export const ErrorSignUpTextContainer = styled.div`
  margin-left: 1vw;
  margin-top: 1.5vh;
  font-family: 'Happiness-Sans-Regular';
  font-size: 1vw;
  color: ${COLORS.ORANGE};
`;

export const InputUsernameContainer = styled.div``;

export const InputPasswordContainer = styled.div`
  margin-top: ${(props) => (props.hasError ? '1.5vh' : '3vh')};
`;

export const InputCheckPasswordContainer = styled.div`
  margin-top: 3vh;
`;

export const InputNicknameContainer = styled.div`
  margin-top: ${(props) => (props.hasError ? '1.5vh' : '3vh')};
`;

export const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const StyledUpload = styled(Upload)`
  &.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select,
  &.ant-upload.ant-upload-select {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34vh;
    height: 34vh;
    text-align: center;
    background-color: ${COLORS.WHITE};
  }

  .ant-upload-wrapper.ant-upload-picture-card-wrapper
    .ant-upload-list.ant-upload-list-picture-card
    .ant-upload-list-item,
  .ant-upload-wrapper.ant-upload-picture-circle-wrapper
    .ant-upload-list.ant-upload-list-picture-card
    .ant-upload-list-item,
  .ant-upload-wrapper.ant-upload-picture-card-wrapper
    .ant-upload-list.ant-upload-list-picture-circle
    .ant-upload-list-item,
  .ant-upload-wrapper.ant-upload-picture-circle-wrapper
    .ant-upload-list.ant-upload-list-picture-circle
    .ant-upload-list-item,
  .ant-upload-wrapper.ant-upload-picture-card-wrapper
    .ant-upload-list.ant-upload-list-picture-card
    .ant-upload-list-item,
  .ant-upload-wrapper.ant-upload-picture-card-wrapper
    .ant-upload-list.ant-upload-list-picture-card
    .ant-upload-list-item-container,
  .ant-upload-list-item-container,
  .ant-upload-list-item.ant-upload-list-item-undefined {
    height: 34vh !important;
    margin: 0 !important;
    width: 34vh !important;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5vh;
  gap: 2vw;
`;
