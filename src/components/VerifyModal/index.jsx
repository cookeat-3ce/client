import React from 'react';
import {
  ModalBackdrop,
  ModalContent,
  ModalTitleContainer,
  ButtonGroup,
  NeedVerifiedInfoImage,
} from './styles';
import CustomText from '../Text';
import CustomButton from '../Button';
import { COLORS } from '../../constants';
import icon_need_verified from '../../assets/icons/need_verified.svg';

const VerifyModal = ({ show, verifiedStatus, onClose, onSubmit }) => {
  if (!show) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <NeedVerifiedInfoImage src={icon_need_verified}></NeedVerifiedInfoImage>
        <ModalTitleContainer>
          <CustomText
            text={
              verifiedStatus === 'REQUEST_VERIFY'
                ? '인증 요청을 검토 중이에요!'
                : '앗, 라이브는 인증된 사용자만 열 수 있어요!'
            }
            fontFamily="Happiness-Sans-Bold"
            fontSize="1.2rem"
            color={COLORS.BLACK}
          />
        </ModalTitleContainer>
        <ButtonGroup>
          <CustomButton
            text={'돌아가기'}
            color={COLORS.WHITE}
            width={'6vw'}
            height={'4vh'}
            fontSize=".8rem"
            borderRadius={'20px'}
            fontFamily={'Happiness-Sans-Bold'}
            backgroundColor={COLORS.LIGHTGRAY}
            borderColor={COLORS.LIGHTGRAY}
            onClick={(e) => {
              e.preventDefault();
              if (onSubmit) {
                onSubmit();
              }
              onClose();
            }}
          />
          {verifiedStatus === 'UNVERIFIED' && (
            <CustomButton
              text={'인증 요청하기'}
              color={COLORS.WHITE}
              width={'8vw'}
              height={'4vh'}
              fontSize=".8rem"
              borderRadius={'20px'}
              fontFamily={'Happiness-Sans-Bold'}
              backgroundColor={COLORS.ORANGE}
              borderColor={COLORS.ORANGE}
              onClick={(e) => {
                e.preventDefault();
                if (onSubmit) {
                  onSubmit();
                }
                onClose();
              }}
            />
          )}
        </ButtonGroup>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default VerifyModal;
