import {
  ButtonGroup,
  ContentContainer,
  ModalBackdrop,
  ModalContent,
  TextContainer,
  NeedVerifiedInfoImage,
} from './styles';
import { COLORS } from '../../constants';
import CustomButton from '../Button';
import CustomText from '../Text';
import { useNavigate } from 'react-router-dom';
import { useCustomNavigate } from '../../hooks';
import { sskcookAPI } from '../../apis/sskcook';
import { useMutation } from '@tanstack/react-query';
import icon_need_verified from '../../assets/icons/need_verified.svg';

const CheckModal = ({ show, onClose, info, check }) => {
  const navigate = useNavigate();

  // const mutation = useMutation({
  //   mutationFn: () => sskcookAPI.deleteIngredientAPI(),
  //   onSuccess: (response) => {
  //     handleChangeUrl('/info');
  //     onClose();
  //   },
  //   onError: (error) => {
  //     console.error(`Failed to delete: `, error);
  //   },
  // });

  const handleCheckButtonClick = () => {
    onClose();
    navigate('/info', { replace: true });
  };

  if (!show) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ContentContainer>
          <NeedVerifiedInfoImage
            src={icon_need_verified}
          ></NeedVerifiedInfoImage>
          <CustomText
            text={info?.name}
            fontFamily="Happiness-Sans-Bold"
            fontSize="1.4rem"
            color={COLORS.ORANGE}
          />
          <TextContainer>
            <CustomText
              text={'슥쿡이 정상적으로 업로드 되었어요!'}
              fontFamily="Happiness-Sans-Bold"
              fontSize="1.2rem"
              color={COLORS.BLACK}
            />
          </TextContainer>
        </ContentContainer>
        <ButtonGroup>
          <CustomButton
            text={'확인'}
            color={COLORS.WHITE}
            width={'6vw'}
            height={'4vh'}
            fontSize={'.8rem'}
            borderRadius={'20px'}
            fontFamily={'Happiness-Sans-Bold'}
            backgroundColor={COLORS.ORANGE}
            borderColor={COLORS.ORANGE}
            onClick={(e) => {
              e.preventDefault();
              handleCheckButtonClick();
            }}
          />
        </ButtonGroup>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default CheckModal;
