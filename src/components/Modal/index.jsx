import React from 'react';
import {
  ButtonGroup,
  ModalBackdrop,
  ModalContent,
  ModalTitleContainer,
  TextContainer,
} from './styles';
import { COLORS } from '../../constants';
import CustomButton from '../Button';
import CustomText from '../Text';

/**
 * 라이브 모달
 *
 * @author 김지수
 * @version 1.0
 * @since 2024.09.05
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.09.05    김지수       최초 생성
 * </pre>
 */
const Modal = ({
  show,
  onClose,
  title,
  content,
  type,
  onDelete,
  onSubmit,
  onCancel,
}) => {
  if (!show) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitleContainer>
          <CustomText
            text={title}
            fontFamily="Happiness-Sans-Bold"
            fontSize="1.2rem"
            color={COLORS.BLACK}
          />
        </ModalTitleContainer>
        <TextContainer>
          <CustomText
            text={content}
            fontFamily="Happiness-Sans-Bold"
            fontSize="1rem"
            color={COLORS.BLACK}
          />
        </TextContainer>
        <ButtonGroup>
          <CustomButton
            text={'닫기'}
            color={COLORS.WHITE}
            width={'5vw'}
            height={'5vh'}
            fontSize={'1rem'}
            borderRadius={'30px'}
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
        </ButtonGroup>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default Modal;
