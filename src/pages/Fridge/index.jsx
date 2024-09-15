import React, { useEffect, useState } from 'react';
import {
  Container,
  ContentContainer,
  FridgeContainer,
  FridgeImageWrapper,
  ImageGridContainer,
  IngredientImage,
  NoIngredientAlertContainer,
  PageTitleContainer,
  TitleWrapper,
} from './styles';
import CustomText from '../../components/Text';
import CustomButton from '../../components/Button';
import { COLORS } from '../../constants';
import fridge_opened from '../../assets/icons/fridge_opened.svg';
import icon_fruit from '../../assets/icons/fruit.svg';
import icon_egg from '../../assets/icons/egg.svg';
import icon_etc from '../../assets/icons/etc.svg';
import icon_seafood from '../../assets/icons/seafood.svg';
import icon_vegi from '../../assets/icons/vegi.svg';
import icon_meat from '../../assets/icons/meat.svg';
import InputModal from '../../components/InputModal';
import { fridgeAPI } from '../../apis/fridge';
import ImageModal from '../../components/ImageModal';
import { Tooltip } from 'antd';
import moment from 'moment';

const Fridge = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [showSubmitIngredientModal, setShowSubmitIngredientModal] =
    useState(false);
  const [showIngredientModal, setShowIngredientModal] = useState(false);

  const fetchMyIngredients = async () => {
    try {
      const response = await fridgeAPI.getIngredientsAPI();
      setIngredients(response.data || []);
    } catch (error) {
      console.error('Failed to fetch ingredients:', error);
    }
  };

  useEffect(() => {
    setSelectedIngredient(null);
    fetchMyIngredients();
  }, []);

  const openSubmitIngredientModal = () => {
    setShowSubmitIngredientModal(true);
  };

  const closeSubmitIngredientModal = () => {
    setShowSubmitIngredientModal(false);
    fetchMyIngredients();
  };

  const openIngredientModal = (item) => {
    setSelectedIngredient(item);
    setShowIngredientModal(true);
  };

  const closeIngredientModal = () => {
    setShowIngredientModal(false);
    fetchMyIngredients();
  };

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
    <Container>
      <PageTitleContainer>
        <TitleWrapper>
          <CustomText
            text={'내 냉장고'}
            fontFamily={'Happiness-Sans-Bold'}
            fontSize={'1.5rem'}
            color={COLORS.BLACK}
          />
          <CustomText
            text={'재료를 등록하면 그에 맞게 레시피를 추천해드려요!'}
            fontFamily={'Happiness-Sans-Regular'}
            fontSize={'1rem'}
            color={COLORS.GRAY}
          />
        </TitleWrapper>
        {0 < ingredients.length && (
          <CustomButton
            text={'재료 등록하기'}
            color={`${COLORS.WHITE}`}
            width={'8vw'}
            height={'4vh'}
            backgroundColor={`${COLORS.ORANGE}`}
            fontFamily={'Happiness-Sans-Bold'}
            fontSize={'.8rem'}
            borderColor={`${COLORS.ORANGE}`}
            borderRadius={'10px'}
            onClick={openSubmitIngredientModal}
          ></CustomButton>
        )}
      </PageTitleContainer>
      <ContentContainer>
        {ingredients.length === 0 ? (
          <NoIngredientAlertContainer>
            <FridgeImageWrapper src={fridge_opened}></FridgeImageWrapper>
            <CustomText
              text={'내 냉장고에 아무것도 없어요!'}
              color={COLORS.BLACK}
              fontFamily={'Happiness-Sans-Bold'}
              fontSize={'1rem'}
            ></CustomText>
            <CustomButton
              text={'재료 등록하기'}
              color={`${COLORS.WHITE}`}
              width={'12vw'}
              height={'4vh'}
              backgroundColor={`${COLORS.ORANGE}`}
              fontFamily={'Happiness-Sans-Bold'}
              fontSize={'.8rem'}
              borderColor={`${COLORS.ORANGE}`}
              borderRadius={'20px'}
              onClick={openSubmitIngredientModal}
            ></CustomButton>
          </NoIngredientAlertContainer>
        ) : (
          <FridgeContainer>
            <ImageGridContainer>
              {ingredients.map((item) => (
                <Tooltip
                  title={
                    <div
                      style={{
                        color: `${
                          moment(item.expdate).isBefore(moment())
                            ? COLORS.ORANGE
                            : COLORS.WHITE
                        }`,
                        textAlign: 'center',
                      }}
                    >
                      {item.name}
                      {moment(item.expdate).isBefore(moment()) && (
                        <>
                          <br />
                          유통기한이 지났습니다.
                        </>
                      )}
                    </div>
                  }
                  color={
                    moment(item.expdate).isBefore(moment())
                      ? COLORS.LIGHTORANGE
                      : COLORS.ORANGE
                  }
                >
                  <IngredientImage
                    isExpired={moment(item.expdate).isBefore(moment())}
                    src={getIcon(item.icon)}
                    onClick={() => {
                      openIngredientModal(item);
                    }}
                  />
                </Tooltip>
              ))}
            </ImageGridContainer>
          </FridgeContainer>
        )}
      </ContentContainer>
      <InputModal
        show={showSubmitIngredientModal}
        onClose={closeSubmitIngredientModal}
      />
      <ImageModal
        show={showIngredientModal}
        onClose={closeIngredientModal}
        info={selectedIngredient}
      />
    </Container>
  );
};

export default Fridge;
