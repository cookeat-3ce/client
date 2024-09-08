import React, { useEffect, useState } from 'react';
import {
  AlertButton,
  Container,
  ContentContainer,
  EventImage,
  EventInfoContainer,
  EventTitleContainer,
  EventTitleWrapper,
  ListButtonWrapper,
  TitleSeparator,
} from './styles';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { eventAPI } from '../../apis/event';
import CustomText from '../../components/Text';
import CustomButton from '../../components/Button';
import { COLORS } from '../../constants';
import moment from 'moment';
import { useCustomNavigate } from '../../hooks';
import { alertAPI } from '../../apis/alert';
import { useRecoilState } from 'recoil';
import { memberState } from '../../store';
import Modal from '../../components/Modal';

const EventDetail = () => {
  const [member] = useRecoilState(memberState);
  const username = member.username;
  const { eventId } = useParams();
  const { handleChangeUrl } = useCustomNavigate();
  const [eventDetail, setEventDetail] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const addRequestData = {
    username: username,
    eventId: eventId,
  };

  const eventDetailQuery = useQuery({
    queryKey: ['eventDetail', eventId],
    queryFn: () => eventAPI.eventDetailAPI(eventId),
    staleTime: Infinity,
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      await alertAPI.requestAlertAPI(data);
    },
    onSuccess: (response) => {
      console.log(response);
      openSubmitModal();
    },

    onError: (error) => {
      if (error.response.status === 409) {
        openErrorModal();
      }
    },
  });

  const handleClickListButton = () => {
    handleChangeUrl('/notice');
  };

  const handleClickAlertButton = () => {
    mutation.mutate(addRequestData);
  };

  const openSubmitModal = () => {
    setShowSubmitModal(true);
  };

  const closeSubmitModal = () => {
    setShowSubmitModal(false);
  };

  const openErrorModal = () => {
    setShowErrorModal(true);
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  useEffect(() => {
    if (eventDetailQuery.data) {
      setEventDetail(eventDetailQuery.data.data);
    }
  }, [eventDetailQuery.data]);

  return (
    <Container>
      <EventTitleContainer>
        <TitleSeparator />
        <EventTitleWrapper>
          <EventInfoContainer>
            <CustomText
              text={eventDetail?.title}
              fontFamily={'Happiness-Sans-Bold'}
              fontSize={'1.6rem'}
              color={COLORS.BLACK}
            />
            <CustomText
              text={`${moment(eventDetail?.startdate).format('M')}월 상위 10개 레시피 목록입니다.`}
              fontFamily={'Happiness-Sans-Regular'}
              fontSize={'1rem'}
              color={COLORS.GRAY}
            />
            <CustomText
              text={`${moment(eventDetail?.startdate).format('YYYY-MM-DD')} ~ ${moment(eventDetail?.enddate).format('YYYY-MM-DD')}`}
              fontFamily={'Happiness-Sans-Bold'}
              fontSize={'1rem'}
              color={COLORS.BLACK}
            />
          </EventInfoContainer>
          {moment() < moment(eventDetail?.enddate) ? (
            <CustomText
              text={`진행 중`}
              fontFamily={'Happiness-Sans-Bold'}
              fontSize={'1rem'}
              color={COLORS.BLACK}
            />
          ) : (
            <CustomText
              text={`종료`}
              fontFamily={'Happiness-Sans-Bold'}
              fontSize={'1rem'}
              color={COLORS.LIGHTGRAY}
            />
          )}
        </EventTitleWrapper>
        <TitleSeparator />
      </EventTitleContainer>
      <ListButtonWrapper>
        <CustomButton
          text={'목록'}
          color={COLORS.WHITE}
          width={'6vw'}
          height={'4vh'}
          backgroundColor={COLORS.LIGHTGRAY}
          borderColor={COLORS.LIGHTGRAY}
          borderRadius={'20px'}
          fontFamily={'Happiness-Sans-Bold'}
          onClick={handleClickListButton}
        />
      </ListButtonWrapper>
      <ContentContainer>
        <EventImage src={eventDetail?.thumbnail}></EventImage>
        <CustomText
          text={eventDetail?.content}
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1rem'}
          color={COLORS.BLACK}
        />
        {moment() > moment(eventDetail?.enddate) && (
          <CustomButton
            text={'알림 받기'}
            color={COLORS.WHITE}
            width={'12vw'}
            height={'6vh'}
            backgroundColor={COLORS.ORANGE}
            borderColor={COLORS.ORANGE}
            borderRadius={'40px'}
            fontFamily={'Happiness-Sans-Bold'}
            onClick={handleClickAlertButton}
          />
        )}
      </ContentContainer>
      <Modal
        show={showSubmitModal}
        onClose={closeSubmitModal}
        title={'신청 완료'}
        content={'신청이 완료됐어요.'}
      ></Modal>
      <Modal
        show={showErrorModal}
        onClose={closeErrorModal}
        title={'중복 신청'}
        content={'이미 등록한 이벤트 알림이에요.'}
      ></Modal>
    </Container>
  );
};

export default EventDetail;
