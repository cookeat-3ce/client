import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  VideoContainer,
  CustomWrapper,
  IngredientItem,
  VideoPreviewContainer,
  VideoPreview,
  BorderLine,
  IngredientSection,
  IngredientWrapper,
  SubTitleContainer,
  TitleContainer,
} from './styles';
import CustomText from '../../components/Text';
import CustomButton from '../../components/Button';
import { COLORS } from '../../constants';
import { longcookAPI } from '../../apis/longcook';
import { getCookie } from '../../hooks';
import { INGREDIENTS } from '../../constants';
import { fridgeAPI } from '../../apis/fridge';
import moment from 'moment';

const LongcookDetails = () => {
  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredientss] = useState([]);
  const [title, setTitle] = useState('');
  const [recipe, setRecipe] = useState('');
  const [prices, setPrices] = useState([]);
  const [username, setUsername] = useState('');

  const getRandomNumber = useCallback((min, max) => {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return Math.round(randomNum / 100) * 100;
  }, []);

  const fetchMyIngredients = async () => {
    try {
      const response = await fridgeAPI.getIngredientsAPI();
      setIngredientss(response.data || []);
    } catch (error) {
      console.error('Failed to fetch ingredients:', error);
    }
  };

  useEffect(() => {
    fetchMyIngredients();
  }, []);

  const generateRandomPrices = (items) => {
    console.log(items, INGREDIENTS);
    return items.map((item) => {
      if (INGREDIENTS[item.name]) {
        return INGREDIENTS[item.name];
      } else {
        return getRandomNumber(1000, 20000);
      }
    });
  };
  useEffect(() => {
    const fetchLongcookDetails = async () => {
      try {
        const { data } = await longcookAPI.longcookDetailsAPI(id);
        const details = data?.details?.[0];

        if (details) {
          setTitle(details.title);
          setRecipe(details.recipe);
          setIngredients(data.ingredients);
          setUsername(details.username);

          if (details.longcookUrl) {
            setFile({
              fileObject: null,
              url: details.longcookUrl,
              video: true,
            });
          }

          const generatedPrices = generateRandomPrices(data.ingredients);
          setPrices(generatedPrices);
        } else {
          console.error('No details found for the given id');
        }
      } catch (error) {
        console.error('Error fetching longcook details:', error);
      }
    };

    fetchLongcookDetails();
  }, [id]);
  console.log(prices);

  const handleItemClick = (item) => {
    const itemIndex = ingredients?.findIndex((ing) => ing.name === item);
    const priceForItem = prices?.[itemIndex];

    if (itemIndex !== -1 && priceForItem !== undefined) {
      const encodedItem = encodeURIComponent(item);
      window.open(
        `https://www.cookeat.site/order?orderData=${encodedItem}&priceData=${priceForItem}`,
        '_blank',
        'noopener,noreferrer',
      );
    } else {
      console.error('Item not found or price unavailable');
    }
  };
  const today = new Date();

  const validIngredientNames = new Set(
    ingredient
      .filter((ing) => moment(ing.expdate).isSameOrAfter(today, 'day'))
      .map((ing) => ing.name),
  );

  // 유효한 재료와 유효하지 않은 재료를 필터링합니다.
  const validIngredients = ingredients?.filter((item) =>
    validIngredientNames.has(item.name),
  );
  const filteredItems = ingredients?.filter(
    (item) => !validIngredientNames.has(item.name),
  );

  // ingredients 배열을 정렬하여 validIngredients를 먼저 표시합니다.
  const sortedIngredients = [...validIngredients, ...filteredItems];

  return (
    <Container>
      <VideoContainer>
        <VideoPreviewContainer>
          <VideoPreview
            file={file?.video}
            src={file?.url || ''}
            controls
            autoPlay
            muted
          />
        </VideoPreviewContainer>
      </VideoContainer>
      <TitleContainer>
        <CustomText
          text={title}
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1.4vw'}
        />
        <CustomText
          text={username}
          fontFamily={'Happiness-Sans-Regular'}
          color={COLORS.GRAY}
          fontSize={'1.2vw'}
        />
      </TitleContainer>
      <SubTitleContainer>
        <CustomText
          text={'식재료'}
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1.2vw'}
          color={COLORS.GRAY}
        />
        <BorderLine />
      </SubTitleContainer>

      <IngredientWrapper>
        {sortedIngredients.map((item, index) => {
          const isHighlighted = validIngredientNames.has(item.name);
          return (
            <IngredientItem key={index}>
              <IngredientSection>
                <CustomText
                  text={item.name}
                  fontFamily={'Happiness-Sans-Regular'}
                  color={isHighlighted ? COLORS.ORANGE : COLORS.BLACK}
                  fontSize={'1vw'}
                />
              </IngredientSection>
              <IngredientSection>
                <CustomText
                  text={item.amount}
                  fontSize={'1vw'}
                  fontFamily={'Happiness-Sans-Regular'}
                />
              </IngredientSection>
              <IngredientSection>
                <CustomText
                  text={
                    INGREDIENTS[item.name]
                      ? `${INGREDIENTS[item.name]}원`
                      : `${(
                          prices[
                            ingredients?.findIndex(
                              (ing) => ing.name === item.name,
                            )
                          ] || '0'
                        ).toString()}원`
                  }
                  fontFamily={'Happiness-Sans-Regular'}
                  color={COLORS.BLACK}
                  fontSize={'1vw'}
                />
              </IngredientSection>
              <IngredientSection>
                <CustomButton
                  text={'구매'}
                  fontSize={'.7vw'}
                  borderRadius={'100px'}
                  color={COLORS.WHITE}
                  backgroundColor={COLORS.ORANGE}
                  borderColor={COLORS.ORANGE}
                  width={'3vw'}
                  height={'3vh'}
                  fontFamily={'Happiness-Sans-Bold'}
                  marginTop={'-0.2vh'}
                  onClick={() => handleItemClick(item.name)}
                />
              </IngredientSection>
            </IngredientItem>
          );
        })}
      </IngredientWrapper>

      <SubTitleContainer>
        <CustomText
          text={'레시피'}
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1.2vw'}
          color={COLORS.GRAY}
        />
        <BorderLine />
      </SubTitleContainer>
      <CustomWrapper>
        <CustomText text={recipe} fontSize={'1vw'} />
      </CustomWrapper>
    </Container>
  );
};

export default LongcookDetails;
