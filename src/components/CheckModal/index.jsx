import {
  ButtonGroup,
  ContentContainer,
  ModalBackdrop,
  ModalContent,
  TextContainer,
  NeedVerifiedInfoImage,
  TitleSeparator,
  TitleContainer,
} from './styles';
import { COLORS } from '../../constants';
import CustomButton from '../Button';
import CustomText from '../Text';
import icon_need_verified from '../../assets/icons/need_verified.svg';
import { useNavigate } from 'react-router-dom';

/**
 * title, content 출력 모달
 *
 * @author 김지수
 * @version 1.0
 * @since 2024.08.28
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.09.11    김지수       최초 생성
 * </pre>
 */
const CheckModal = ({ show, onClose, title, info, admin = false, check }) => {
  const navigate = useNavigate();
  const handleCheckButtonClick = () => {
    onClose();
    if (!admin) {
      navigate('/info');
    }
  };

  if (!show) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ContentContainer>
          <TitleContainer>
            {!admin && (
              <NeedVerifiedInfoImage
                src={icon_need_verified}
              ></NeedVerifiedInfoImage>
            )}
            <CustomText
              text={title}
              fontSize={'1.2rem'}
              fontFamily={'Happiness-Sans-Bold'}
              color={COLORS.BLACK}
            />
          </TitleContainer>
          <TextContainer>
            <TitleSeparator />
            <CustomText
              text={info}
              fontFamily="Happiness-Sans-Bold"
              fontSize="1.1rem"
              color={COLORS.BLACK}
              style={{ lineHeight: '3vh' }}
            />
            <TitleSeparator />
          </TextContainer>
        </ContentContainer>
        <ButtonGroup>
          <CustomButton
            text={'확인'}
            color={COLORS.WHITE}
            width={'5vw'}
            height={'4.5vh'}
            fontSize={'1rem'}
            borderRadius={'30px'}
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
