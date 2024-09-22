import React, { useState, useRef } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import { memberState } from '../../store';
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
  IngredientsListContainer,
  IngredientItem,
  RemoveButton,
  VideoPreviewContainer,
  PlaceholderText,
  VideoPreview,
  SubmitButtonWrapper,
} from './styles';
import CustomText from '../../components/Text';
import CustomTextButton from '../../components/Button/Text';
import CustomButton from '../../components/Button';
import { COLORS } from '../../constants';
import { CustomInput, CustomInputTextarea } from '../../components/Input';
import { longcookAPI } from '../../apis/longcook';
import CheckModal from '../../components/CheckModal';
import ReactGA from 'react-ga4';

/**
 * 스윽쿡 업로드
 *
 * @author 박유진
 * @version 1.0
 * @since 2024.09.01
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.09.01    박유진       최초 생성, 스윽쿡 업로드
 * 2024.09.11    박유진       스윽쿡 업로드 데이터 수정
 * </pre>
 */
const LongcookUpload = () => {
  const [member] = useRecoilState(memberState);
  const username = member.username;
  const [file, setFile] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientAmount, setIngredientAmount] = useState('');
  const [title, setTitle] = useState('');
  const [recipe, setRecipe] = useState('');
  const fileInputRef = useRef(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const openUploadModal = () => {
    setShowUploadModal(true);
  };
  const closeUploadModal = () => {
    setShowUploadModal(false);
  };

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
    (formData) => longcookAPI.longcookUploadAPI(formData),
    {
      onSuccess: () => {
        console.log('업로드 성공');
        ReactGA.event({
          category: 'Longcook',
          action: 'Longcook_upload',
        });
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

    // FormData 생성
    const formData = new FormData();

    // sskcook JSON 데이터
    const longcookData = JSON.stringify({
      username: username,
      title: title,
      recipe: recipe,
      ingredient: ingredients,
    });

    formData.append('file', file.fileObject);
    formData.append(
      'longcook',
      new Blob([longcookData], { type: 'application/json; charset=UTF-8' }),
    );
    mutation.mutate(formData);
  };

  return (
    <Container>
      <TextContainer>
        <CustomText
          text="스-윽쿡 등록"
          fontFamily={'Happiness-Sans-Bold'}
          color={COLORS.BLACK}
        />
      </TextContainer>
      <UploadContainer>
        <SubTitleContainer>
          <CustomText
            text="스-윽쿡"
            fontFamily={'Happiness-Sans-Bold'}
            fontSize={'1vw'}
            color={COLORS.BLACK}
          />
          <UploadButtonWrapper>
            <CustomButton
              text={'업로드'}
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
      </UploadContainer>
      <InputContainer>
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
            height={150}
            width={500}
            maxLength={1200}
            paddingLeft={480}
          />
        </CustomInputWrapper>
        <SubmitButtonWrapper>
          <CustomButton
            text={'등록'}
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
      </InputContainer>
      <CheckModal
        show={showUploadModal}
        onClose={closeUploadModal}
        info={'스-윽쿡이 정상적으로 업로드 되었어요!'}
      />
    </Container>
  );
};

export default LongcookUpload;
