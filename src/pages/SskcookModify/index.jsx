import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';

import {
  Container,
  TextContainer,
  InputContainer,
  UploadContainer,
  TitleContainer,
  SubTitleContainer,
  UploadButtonWrapper,
  CustomInputWrapper,
  IngredientsContainer,
  IngredientsInputWrapper,
  AddButtonWrapper,
  RecipeContainer,
  HashtagContainer,
  IngredientsListContainer,
  IngredientItem,
  RemoveButton,
  Space,
  CustomSelect,
  VideoPreviewContainer,
  PlaceholderText,
  VideoPreview,
  SubmitButtonWrapper,
} from './styles';
import CustomText from '../../components/Text';
import CustomTextButton from '../../components/Button/Text';
import CustomButton from '../../components/Button';
import { COLORS, TAGS } from '../../constants';
import { CustomInput, CustomInputTextarea } from '../../components/Input';
import { sskcookAPI } from '../../apis/sskcook';
import CheckModal from '../../components/CheckModal';

const SskcookModify = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientAmount, setIngredientAmount] = useState('');
  const [title, setTitle] = useState('');
  const [recipe, setRecipe] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const fileInputRef = useRef(null);
  const [sskcookUrl, setSskcookUrl] = useState('');
  const [sskcookId, setSskcookId] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const openUploadModal = () => {
    setShowUploadModal(true);
  };
  const closeUploadModal = () => {
    setShowUploadModal(false);
  };
  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const options = Object.keys(TAGS).map((key) => ({
    label: TAGS[key],
    value: key,
  }));

  const handleChange = (value) => {
    setSelectedTags(value);
  };
  useEffect(() => {
    const fetchSskcookDetails = async () => {
      try {
        const { data } = await sskcookAPI.sskcookDetailsAPI(id);
        console.log(data.details[0]);
        setTitle(data.details[0].title);
        setRecipe(data.details[0].recipe);
        setIngredients(data.ingredients);
        setSskcookUrl(data.details[0].sskcookUrl);
        setSskcookId(data.details[0].sskcookId);
        if (data.details[0].sskcookUrl) {
          setFile({
            fileObject: null,
            url: data.details[0].sskcookUrl,
            video: true,
          });
        }
      } catch (error) {
        console.error('Error fetching sskcook details: ', error);
      }
    };

    fetchSskcookDetails();
  }, [id]);

  const videoUpload = (e) => {
    const selectedFile = e.target.files[0];
    const videoType = selectedFile.type.includes('video');

    setFile({
      fileObject: selectedFile,
      url: URL.createObjectURL(e.target.files[0]),
      video: videoType,
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleAddIngredient = () => {
    if (ingredientName && ingredientAmount) {
      setIngredients([
        ...ingredients,
        { name: ingredientName, amount: ingredientAmount },
      ]);
      setIngredientName('');
      setIngredientAmount('');
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const mutation = useMutation(
    (formData) => sskcookAPI.sskcookUpdateAPI(formData),
    {
      onSuccess: () => {
        console.log('수정 성공');
        openUploadModal();
      },
      onError: (error) => {
        console.error();
      },
    },
  );

  const handleFormSubmit = async () => {
    if (!file || !file.fileObject) {
      console.error('파일이 선택되지 않았습니다.');
      return;
    }

    const formData = new FormData();
    const hashtags = selectedTags.map((tagId) => ({
      hashtagId: Number(tagId),
    }));

    const sskcookData = JSON.stringify({
      sskcookUrl: sskcookUrl,
      sskcookId: sskcookId,
      title: title,
      recipe: recipe,
      ingredient: ingredients,
      hashtag: hashtags,
    });

    formData.append('file', file.fileObject);
    formData.append('sskcook', sskcookData);
    console.log(sskcookData);
    mutation.mutate(formData);
  };

  const deleteMutation = useMutation(
    () => sskcookAPI.sskcookDeleteAPI(sskcookId),
    {
      onSuccess: () => {
        console.log('삭제 성공');
        openDeleteModal();
      },
      onError: (error) => {
        console.error('삭제 실패:', error);
      },
    },
  );

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <Container>
      <InputContainer>
        <TextContainer>
          <CustomText
            text="슥쿡 수정"
            fontFamily={'Happiness-Sans-Bold'}
            color={COLORS.BLACK}
          />
        </TextContainer>
        <TitleContainer>
          <CustomText
            text={'제목'}
            fontFamily={'Happiness-Sans-Bold'}
            fontSize={'1vw'}
            color={COLORS.BLACK}
          />
        </TitleContainer>
        <CustomInputWrapper>
          <CustomInput
            placeholder={'제목을 입력하세요'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fontSize={'1vw'}
            height={30}
            width={350}
          />
        </CustomInputWrapper>
        <IngredientsContainer>
          <CustomText
            text={'재료'}
            fontFamily={'Happiness-Sans-Bold'}
            fontSize={'1vw'}
            color={COLORS.BLACK}
          />
        </IngredientsContainer>
        <IngredientsInputWrapper>
          <CustomInput
            text={'재료'}
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
            fontSize={'1vw'}
            height={30}
            width={100}
          />
          <CustomInput
            text={'양'}
            value={ingredientAmount}
            onChange={(e) => setIngredientAmount(e.target.value)}
            fontSize={'1vw'}
            height={30}
            width={50}
          />
          <AddButtonWrapper>
            <CustomTextButton
              text={'추가'}
              color={COLORS}
              fontFamily={'Happiness-Sans-Bold'}
              fontSize={'1vw'}
              onClick={handleAddIngredient}
            />
          </AddButtonWrapper>
        </IngredientsInputWrapper>

        <IngredientsListContainer>
          {ingredients.map((ingredient, index) => (
            <IngredientItem key={index}>
              {ingredient.name} {ingredient.amount}
              <RemoveButton onClick={() => handleRemoveIngredient(index)}>
                x
              </RemoveButton>
            </IngredientItem>
          ))}
        </IngredientsListContainer>

        <RecipeContainer>
          <CustomText
            text={'레시피'}
            fontFamily={'Happiness-Sans-Bold'}
            fontSize={'1vw'}
            color={COLORS.BLACK}
          />
        </RecipeContainer>
        <CustomInputWrapper>
          <CustomInputTextarea
            text={'레시피를 입력하세요'}
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
            fontSize={'1vw'}
            height={120}
            width={350}
            maxLength={500} // 최대 글자 수 지정
          />
        </CustomInputWrapper>
        <HashtagContainer>
          <CustomText
            text={'해시태그'}
            fontFamily={'Happiness-Sans-Bold'}
            fontSize={'1vw'}
            color={COLORS.BLACK}
          />
          <Space>
            <CustomSelect
              mode="multiple"
              allowClear
              placeholder="태그 선택하기"
              onChange={handleChange}
              options={options}
            />
          </Space>
        </HashtagContainer>
      </InputContainer>

      <UploadContainer>
        <SubTitleContainer>
          <CustomText
            text="슥쿡"
            fontFamily={'Happiness-Sans-Bold'}
            fontSize={'1vw'}
            color={COLORS.BLACK}
          />
          <UploadButtonWrapper>
            <CustomButton
              text={'변경하기'}
              fontSize={'.6vw'}
              width={'4vw'}
              height={'3vh'}
              color={COLORS.WHITE}
              borderRadius={'20px'}
              fontFamily={'Happiness-Sans-Bold'}
              backgroundColor={COLORS.BLACK}
              borderColor={COLORS.BLACK}
              onClick={handleUploadClick}
            />
          </UploadButtonWrapper>
        </SubTitleContainer>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={videoUpload}
          accept="video/*"
        />
        <VideoPreviewContainer>
          <VideoPreview
            file={file && file.video}
            src={file ? file.url : ''}
            controls
          />
          <PlaceholderText file={file && file.video}>
            영상 미리보기가 여기에 표시됩니다.
          </PlaceholderText>
        </VideoPreviewContainer>
        <SubmitButtonWrapper>
          <CustomButton
            text={'삭제'}
            fontSize={'.8vw'}
            width={'4vw'}
            height={'4vh'}
            color={COLORS.WHITE}
            borderRadius={'20px'}
            fontFamily={'Happiness-Sans-Bold'}
            backgroundColor={COLORS.LIGHTGRAY}
            borderColor={COLORS.LIGHTGRAY}
            onClick={handleDelete}
          />
          <CustomButton
            text={'수정'}
            fontSize={'.8vw'}
            width={'4vw'}
            height={'4vh'}
            color={COLORS.WHITE}
            borderRadius={'20px'}
            fontFamily={'Happiness-Sans-Bold'}
            backgroundColor={COLORS.DARKGRAPEFRUIT}
            borderColor={COLORS.DARKGRAPEFRUIT}
            onClick={handleFormSubmit}
          />
        </SubmitButtonWrapper>
      </UploadContainer>
      <CheckModal
        show={showUploadModal}
        onClose={closeUploadModal}
        info={'슥쿡이 정상적으로 수정 되었어요!'}
      />
      <CheckModal
        show={showDeleteModal}
        onClose={closeDeleteModal}
        info={'슥쿡이 성공적으로 삭제되었어요!'}
      />
    </Container>
  );
};

export default SskcookModify;
