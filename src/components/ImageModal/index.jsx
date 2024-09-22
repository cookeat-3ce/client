import React from 'react';
import {
  ButtonGroup,
  ContentContainer,
  IngredientImage,
  ModalBackdrop,
  ModalContent,
  TextContainer,
} from './styles';
import { COLORS } from '../../constants';
import CustomButton from '../Button';
import CustomText from '../Text';
import icon_fruit from '../../assets/icons/fruit.svg';
import icon_egg from '../../assets/icons/egg.svg';
import icon_etc from '../../assets/icons/etc.svg';
import icon_seafood from '../../assets/icons/seafood.svg';
import icon_vegi from '../../assets/icons/vegi.svg';
import icon_meat from '../../assets/icons/meat.svg';
import moment from 'moment';
import { useCustomNavigate } from '../../hooks';
import { fridgeAPI } from '../../apis/fridge';
import { useMutation } from '@tanstack/react-query';

/**
 * 이미지 포함된 모달
 *
 * @author 김지수
 * @version 1.0
 * @since 2024.09.06
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.09.06    김지수       최초 생성
 * </pre>
 */
const ImageModal = ({ show, onClose, info, onDelete }) => {
  const { handleChangeUrl } = useCustomNavigate();

  const mutation = useMutation({
    mutationFn: (id) => fridgeAPI.deleteIngredientAPI(id),
    onSuccess: (response) => {
      console.log(response);
      handleChangeUrl('/myfridge');
      onClose();
    },
    onError: (error) => {
      console.error(`Failed to delete: `, error);
    },
  });

  const handleDeleteButtonClick = () => {
    console.log('id: ', info.ingredientId);
    mutation.mutate(info.ingredientId);
  };

  if (!show) return null;

  const getIcon = (iconId) => {
    switch (parseInt(iconId)) {
      case 1:
        return icon_fruit;
      case 2:
        return icon_vegi;
      case 3:
        return icon_meat;
      case 4:
        return icon_seafood;
      case 5:
        return icon_egg;
      default:
        return icon_etc;
    }
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ContentContainer>
          <IngredientImage src={getIcon(info?.icon)}></IngredientImage>
          <CustomText
            text={info?.name}
            fontFamily="Happiness-Sans-Bold"
            fontSize="1.4rem"
            color={COLORS.ORANGE}
          />
          <TextContainer>
            <CustomText
              text={`수량: ${info?.amount}`}
              fontFamily="Happiness-Sans-Bold"
              fontSize="1.2rem"
              color={COLORS.BLACK}
            />
            <CustomText
              text={`유효기간: ${moment(info?.expdate).format('YYYY-MM-DD')}`}
              fontFamily="Happiness-Sans-Bold"
              fontSize="1.2rem"
              color={COLORS.BLACK}
            />
          </TextContainer>
        </ContentContainer>
        <ButtonGroup>
          <CustomButton
            text={'닫기'}
            color={COLORS.ORANGE}
            width={'5vw'}
            height={'5vh'}
            fontSize={'1rem'}
            borderRadius={'30px'}
            fontFamily={'Happiness-Sans-Bold'}
            backgroundColor={COLORS.WHITE}
            borderColor={COLORS.ORANGE}
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          />
          <CustomButton
            text={'사용 완료'}
            color={COLORS.WHITE}
            width={'7vw'}
            height={'5vh'}
            fontSize={'1rem'}
            borderRadius={'30px'}
            fontFamily={'Happiness-Sans-Bold'}
            backgroundColor={COLORS.ORANGE}
            borderColor={COLORS.ORANGE}
            onClick={(e) => {
              e.preventDefault();
              handleDeleteButtonClick();
            }}
          />
        </ButtonGroup>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default ImageModal;
