import styled from 'styled-components';
import { COLORS } from '../../constants';
import { Upload } from 'antd';
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60vw;
  height: 70vh;
  background-color: ${COLORS.WHITE};
  border-radius: 10px;
  border: 2px solid ${COLORS.STROKE};
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
  font-size: 1.3vw;
`;

export const Inner = styled.div`
  margin-top: 1vh;
  display: flex;
  align-items: center;
  width: 50vw;
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
  font-family: 'Happiness-Sans-Bold';
  font-size: 0.8vw;
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
  margin-top: 5vh;
  gap: 3vh;
`;

<span
  role="img"
  aria-label="eye"
  class="anticon anticon-eye"
  style="fill: white;"
>
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="eye"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path>
  </svg>
</span>;

export const StyledUpload = styled(Upload)`
  &.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select,
  &.ant-upload.ant-upload-select {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30vh;
    height: 30vh;
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
    height: 30vh !important;
    margin: 0 !important;
    width: 30vh !important;
  }
  .anticon.anticon-plus {
    svg {
      fill: black;
    }
  }
  .anticon {
    svg {
      fill: white;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5vh;
  gap: 2vw;
`;
