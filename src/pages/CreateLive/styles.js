import styled from 'styled-components';
import { COLORS } from '../../constants';
import { InputNumber, Radio } from 'antd';

export const Container = styled.div`
  width: 72vw;
  margin: 0 2vw;
  // border: 10px solid BLACK;
`;

export const PageTitleContainer = styled.div`
  margin: 2vh 0;
  // border: 10px solid BLACK;
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 52vh;
  // border: 10px solid RED;
`;

export const LeftContainer = styled.div`
  width: 50%;
  // border: 10px solid RED;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4vh 0 0 0;
  gap: 2vh;
  // border: 10px solid BLACK;
`;

export const RadioContainer = styled.div`
  width: 32vw;
  display: flex;
  align-items: center;
  // border: 10px solid GREEN;
`;

export const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0.8vh 0 0 0;
  // border: 10px solid GREEN;
`;

export const RadioLabel = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0.8vw;
  // border: 10px solid RED;
`;

export const StyledRadio = styled(Radio)`
  &.ant-radio-wrapper {
    color: ${COLORS.STROKE};

    .ant-radio-inner {
      border-color: ${COLORS.STROKE};
    }

    &.ant-radio-wrapper-checked .ant-radio-inner {
      background-color: ${COLORS.ORANGE} !important;
      border-color: ${COLORS.ORANGE} !important;
    }

    &.ant-radio-wrapper-checked {
      color: ${COLORS.ORANGE} !important;
    }

    &:focus {
      .ant-radio-inner {
        border-color: ${COLORS.ORANGE} !important;
      }
    }
  }

  // 클릭된 상태의 Radio 스타일링
  .ant-radio-inner {
    border-color: ${COLORS.STROKE} !important;
  }

  .ant-radio-checked .ant-radio-inner {
    background-color: ${COLORS.ORANGE} !important;
    border-color: ${COLORS.ORANGE} !important;
  }
`;

export const TooltipIconWrapper = styled.img`
  width: 1.2vw;
  margin: 0 0 0 1vw;
  // border: 10px solid GREEN;
`;

export const ParticipantTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ParticipantContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vw;
  // border: 10px solid GREEN;
`;

export const CustomInputNumber = styled(InputNumber)`
  &.ant-input-number {
    border-color: ${COLORS.STROKE}; /* 기본 테두리 색상 */
  }

  .ant-input-number-input {
    border: 1px solid rgba(206, 206, 206, 0.5);
    padding: 0 10px;
  }

  &.ant-input-number-focused,
  &.ant-input-number:focus {
    border-color: ${COLORS.STROKE} !important;
    box-shadow: 0 0 0 2px rgba(255, 165, 0, 0.2) !important;
  }

  .ant-input-number-input:focus {
    border-color: ${COLORS.ORANGE} !important;
  }

  .ant-input-number-handler-wrap {
    display: none;
  }
`;

export const RightContainer = styled.div`
  width: 50%;
  margin: 4vh 0;
  // border: 10px solid GREEN;
`;

export const ThumbnailWrapper = styled.div`
  margin: 2vh 0;
  width: 20vw;
  height: 20vw;
  // border: 10px solid GREEN;
`;

export const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 2vh 0;
  gap: 2vh;
  // border: 10px solid BLACK;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5vh;
  gap: 2vw;
  // border: 10px solid BLACK;
`;

export const ThumbnailButton = styled.input`
  width: 6vw;
  height: 4vw;
  background-color: ${COLORS.ORANGE}
  border-color: ${COLORS.ORANGE}
  border-radius: 100px;
`;
