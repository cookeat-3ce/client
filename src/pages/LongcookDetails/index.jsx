import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  UploadContainer,
  CustomWrapper,
  TitleContainer,
  IngredientItem,
  VideoPreviewContainer,
  VideoPreview,
  BorderLine,
  IngredientSection,
  IngredientWrapper,
} from './styles';
import CustomText from '../../components/Text';
import CustomButton from '../../components/Button';
import { COLORS } from '../../constants';
import { longcookAPI } from '../../apis/longcook';

const LongcookDetails = () => {
  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [title, setTitle] = useState('');
  const [recipe, setRecipe] = useState('');
  const [longcookUrl, setLongcookUrl] = useState('');
  const [longcookId, setLongcookId] = useState('');

  useEffect(() => {
    const fetchLongcookDetails = async () => {
      try {
        const { data } = await longcookAPI.longcookDetailsAPI(id);
        console.log(data.details[0]);
        setTitle(data.details[0].title);
        setRecipe(data.details[0].recipe);
        setIngredients(data.ingredients);
        setLongcookUrl(data.details[0].longcookUrl);
        setLongcookId(data.details[0].longcookId);
        if (data.details[0].longcookUrl) {
          setFile({
            fileObject: null,
            url: data.details[0].longcookUrl,
            video: true,
          });
        }
      } catch (error) {
        console.error('Error fetching longcook details: ', error);
      }
    };

    fetchLongcookDetails();
  }, [id]);

  return (
    <Container>
      <UploadContainer>
        <VideoPreviewContainer>
          <VideoPreview
            file={file && file.video}
            src={file ? file.url : ''}
            controls
          />
        </VideoPreviewContainer>
      </UploadContainer>
      <CustomText
        text={title}
        fontFamily={'Happiness-Sans-Bold'}
        fontSize={'1.4vw'}
      />
      <TitleContainer>
        <CustomText
          text={'식재료'}
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1.2vw'}
          color={COLORS.GRAY}
        />
        <BorderLine />
      </TitleContainer>

      <IngredientWrapper>
        {ingredients.map((ingredient, index) => (
          <IngredientItem key={index}>
            <IngredientSection>
              <CustomText text={ingredient.name} fontSize={'1vw'} />
            </IngredientSection>
            <IngredientSection>
              <CustomText text={ingredient.amount} fontSize={'1vw'} />
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
              />
            </IngredientSection>
          </IngredientItem>
        ))}
      </IngredientWrapper>

      <TitleContainer>
        <CustomText
          text={'레시피'}
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1.2vw'}
          color={COLORS.GRAY}
        />
        <BorderLine />
      </TitleContainer>
      <CustomWrapper>
        <CustomText text={recipe} fontSize={'1vw'} />
      </CustomWrapper>
    </Container>
  );
};

export default LongcookDetails;
