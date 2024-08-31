import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Container,
  ContentWrapper,
  ImageButtonWrapper,
  InfoWrapper,
  TitleWrapper,
} from './styles';
import { COLORS } from '../../constants';
import CustomText from '../Text';
import CustomImageButton from '../Button/Image';
import TrashIcon from '../../assets/icons/trash.svg';
import { noticeAPI } from '../../apis/notice';

const Notice = ({ title, content, noticeId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (noticeId) => noticeAPI.noticeDeleteAPI(noticeId),
    onSuccess: () => {
      queryClient.invalidateQueries('notices');
    },
    onError: (error) => {
      console.error('Failed to delete notice:', error);
    },
  });

  const handleButtonClick = () => {
    console.log('delete notice: ', noticeId);
    mutation.mutate(noticeId);
  };

  return (
    <Container>
      <InfoWrapper>
        <TitleWrapper>
          <CustomText
            fontFamily="Happiness-Sans-Bold"
            fontSize="1.2rem"
            color={COLORS.BLACK}
            text={title}
          />
        </TitleWrapper>
        <ContentWrapper>
          <CustomText
            fontFamily="Happiness-Sans-Regular"
            fontSize="1rem"
            color={COLORS.BLACK}
            text={content}
          />
        </ContentWrapper>
      </InfoWrapper>
      <ImageButtonWrapper>
        <CustomImageButton
          src={TrashIcon}
          width="2vw"
          onClick={handleButtonClick}
        ></CustomImageButton>
      </ImageButtonWrapper>
    </Container>
  );
};

export default Notice;
