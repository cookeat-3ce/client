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

/**
 * 공지 컴포넌트
 *
 * @author 김지수
 * @version 1.0
 * @since 2024.08.31
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.08.31    김지수       최초 생성
 * </pre>
 */
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
