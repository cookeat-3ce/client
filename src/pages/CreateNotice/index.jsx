import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { memberState } from '../../store';
import { noticeAPI } from '../../apis/notice';
import { useRecoilState } from 'recoil';
import {
  ButtonContainer,
  Container,
  ContentContainer,
  InputContainer,
  PageTitleContainer,
} from './styles';
import { useCustomNavigate } from '../../hooks';
import CustomText from '../../components/Text';
import { COLORS } from '../../constants';
import { CustomInput, CustomInputTextarea } from '../../components/Input';
import CustomButton from '../../components/Button';

/**
 * 사용자 공지 등록
 *
 * @author 김지수
 * @version 1.0
 * @since 2024.09.05
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.09.05    김지수       최초 생성
 * </pre>
 */
const CreateNotice = () => {
  const [member] = useRecoilState(memberState);
  const { handleChangeUrl } = useCustomNavigate();
  const username = member.username;
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);

  const addNoticeData = {
    username: username,
    title: title,
    content: content,
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      await noticeAPI.noticeInsertAPI(data);
    },
    onSuccess: (response) => {
      console.log(response);
      handleChangeUrl('/info');
    },

    onError: (error) => {},
  });

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleClickSubmitButton = () => {
    console.log('addNoticeData: ', addNoticeData);
    mutation.mutate(addNoticeData);
  };

  return (
    <Container>
      <PageTitleContainer>
        <CustomText
          text={'공지 등록하기'}
          fontFamily="Happiness-Sans-Bold"
          fontSize="1.5rem"
          color={COLORS.BLACK}
        />
      </PageTitleContainer>
      <ContentContainer>
        <InputContainer>
          <CustomText
            text={'제목'}
            fontFamily={'Happiness-Sans-Bold'}
            fontSize={'1.2rem'}
            color={COLORS.BLACK}
          />
          <CustomInput
            type={'text'}
            width={'18vw'}
            height={'6vh'}
            fontSize={'1rem'}
            onChange={handleChangeTitle}
          />
          <CustomText />
        </InputContainer>
        <InputContainer>
          <CustomText
            text={'내용'}
            fontFamily={'Happiness-Sans-Bold'}
            fontSize={'1.2rem'}
            color={COLORS.BLACK}
          />
          <CustomInputTextarea
            type={'text'}
            width={'32vw'}
            height={'12vh'}
            fontSize={'1rem'}
            onChange={handleChangeContent}
          />
          <CustomText />
        </InputContainer>
        <ButtonContainer>
          <CustomButton
            text={'취소'}
            color={COLORS.ORANGE}
            width={'4vw'}
            height={'4vh'}
            fontSize={'1rem'}
            borderRadius={'100px'}
            fontFamily={'Happiness-Sans-Bold'}
            backgroundColor={COLORS.WHITE}
            borderColor={COLORS.ORANGE}
            onClick={handleBack}
          />
          <CustomButton
            text={'등록'}
            color={COLORS.WHITE}
            width={'6vw'}
            height={'4vh'}
            fontSize={'1rem'}
            borderRadius={'100px'}
            fontFamily={'Happiness-Sans-Bold'}
            backgroundColor={COLORS.ORANGE}
            borderColor={COLORS.ORANGE}
            onClick={(e) => {
              e.preventDefault();
              handleClickSubmitButton();
            }}
          />
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
};

export default CreateNotice;
