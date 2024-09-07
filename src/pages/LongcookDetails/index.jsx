import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  UploadContainer,
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

const LongcookDetails = () => {
  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [title, setTitle] = useState('');
  const [recipe, setRecipe] = useState('');
  const [longcookUrl, setLongcookUrl] = useState('');
  const [longcookId, setLongcookId] = useState('');
  const [username, setUsername] = useState('');

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
        setUsername(data.details[0].username);
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

  const handleItemClick = (item) => {
    const encodedItem = encodeURIComponent(item);
    window.open(
      `http://localhost:3000/order?data=${encodedItem}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

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
                onClick={() => handleItemClick(ingredient.name)}
              />
            </IngredientSection>
          </IngredientItem>
        ))}
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
