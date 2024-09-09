import React, { useState, useEffect } from 'react';
import {
  Container,
  ContentContainer,
  FridgeImageWrapper,
  NoIngredientAlertContainer,
  NoIngredientAlertImage,
  PageTitleContainer,
  SskcookContainer,
} from './styles';
import CustomText from '../../components/Text';
import { COLORS } from '../../constants';
import { fridgeAPI } from '../../apis/fridge';
import { useQuery } from '@tanstack/react-query';
import fridge_opened from '../../assets/icons/fridge_opened.svg';
import CustomButton from '../../components/Button';
import { useCustomNavigate } from '../../hooks';
import { sskcookAPI } from '../../apis/sskcook';
import { memberState } from '../../store';
import { useRecoilState } from 'recoil';
import CustomVideoList from '../../components/VideoList';

const RecipeRecommend = () => {
  const [member] = useRecoilState(memberState);
  const username = member.username;
  const { handleChangeUrl } = useCustomNavigate();
  const [recommends, setRecommends] = useState([]);
  const [isFridgeEmpty, setIsFridgeEmpty] = useState(true);

  const myIngredientsQuery = useQuery({
    queryKey: ['myIngredients'],
    queryFn: () => fridgeAPI.getIngredientsAPI(),
    staleTime: Infinity,
  });

  const recommendsRecipeQuery = useQuery({
    queryKey: ['recommends'],
    queryFn: () => sskcookAPI.getSskcookRecommendsAPI(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (myIngredientsQuery.data && myIngredientsQuery.data.data.length > 0) {
      setIsFridgeEmpty(false);
    }
  }, [myIngredientsQuery.data]);

  useEffect(() => {
    if (recommendsRecipeQuery.data) {
      setRecommends(recommendsRecipeQuery.data.data);
      console.log(recommendsRecipeQuery.data.data);
    }
  }, [recommendsRecipeQuery.data]);

  const handleClickButtonToFridge = () => {
    handleChangeUrl('/myfridge');
  };

  return (
    <Container>
      <PageTitleContainer>
        <CustomText
          text={'냉장고 파헤치기'}
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1.5rem'}
          color={COLORS.BLACK}
        />
        <CustomText
          text={
            '냉장고 속 재료를 가장 잘 활용할 수 있는 요리들을 추천해드려요!'
          }
          fontFamily={'Happiness-Sans-Regular'}
          fontSize={'1rem'}
          color={COLORS.GRAY}
        />
      </PageTitleContainer>
      <ContentContainer>
        {isFridgeEmpty ? (
          <NoIngredientAlertContainer>
            <FridgeImageWrapper src={fridge_opened}></FridgeImageWrapper>
            <CustomText
              text={'내 냉장고에 아무것도 없어요!'}
              color={COLORS.BLACK}
              fontFamily={'Happiness-Sans-Bold'}
              fontSize={'1rem'}
            ></CustomText>
            <CustomButton
              text={'냉장고로 이동'}
              color={`${COLORS.WHITE}`}
              width={'12vw'}
              height={'4vh'}
              backgroundColor={`${COLORS.ORANGE}`}
              fontFamily={'Happiness-Sans-Bold'}
              fontSize={'.8rem'}
              borderColor={`${COLORS.ORANGE}`}
              borderRadius={'20px'}
              onClick={handleClickButtonToFridge}
            ></CustomButton>
          </NoIngredientAlertContainer>
        ) : (
          <SskcookContainer>
            <CustomVideoList type={'sskcook'} videos={recommends} />
          </SskcookContainer>
        )}
      </ContentContainer>
    </Container>
  );
};

export default RecipeRecommend;
