import React, { useEffect, useState } from 'react';
import {
  Container,
  ContentContainer,
  EventContainer,
  EventInfoWrapper,
  EventThumbnailImage,
  PageTitleContainer,
} from './styles';
import CustomText from '../../components/Text';
import CustomButton from '../../components/Button';
import { COLORS } from '../../constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import { eventAPI } from '../../apis/event';
import { alertAPI } from '../../apis/alert';
import moment from 'moment';
import {
  MoveButton,
  PaginationButton,
  PaginationContainer,
} from '../Event/styles';
import CheckModal from '../../components/CheckModal';

const AdminAlarm = () => {
  const [eventList, setEventList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [start, setStart] = useState(1);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedEventDetail, setSelectedEventDetail] = useState(null);
  const [showContentModal, setShowContentModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const pageCount = 5;

  const eventListQuery = useQuery({
    queryKey: ['eventDetail', pageNum],
    queryFn: () => eventAPI.eventListAPI(pageNum),
    staleTime: Infinity,
  });

  const eventDetailQuery = useQuery({
    queryKey: ['eventDetail', selectedEventId],
    queryFn: () => eventAPI.eventDetailAPI(selectedEventId),
    staleTime: Infinity,
  });

  const mutation = useMutation({
    mutationFn: (alertData) => alertAPI.sendAlertAPI(alertData),
    onSuccess: (response) => {
      openCompleteModal();
    },
    onError: (error) => {
      console.error(`Failed to send: `, error);
    },
  });

  const openCompleteModal = () => {
    setShowCompleteModal(true);
  };

  const closeCompleteModal = () => {
    setShowCompleteModal(false);
  };

  const openContentModal = () => {
    setShowContentModal(true);
  };

  const closeContentModal = () => {
    setShowContentModal(false);
  };

  const handlePageChange = (newPageNum) => {
    if (newPageNum === pageNum) return;
    setPageNum(newPageNum);
  };

  const handleNext = () => {
    if (start + pageCount <= totalPages) {
      setStart(start + pageCount);
      setPageNum(start + pageCount); // 시작 페이지를 다음 페이지로 변경
    }
  };

  const handlePrev = () => {
    if (start > 1) {
      setStart(start - pageCount);
      setPageNum(start - pageCount); // 이전 페이지로 이동
    }
  };

  const clickEventAlert = (eventId) => {
    const alertData = {
      eventId: eventId,
      message: '2024년 8월 [양고기 마라샹궈] 밀키트가 출시되었습니다.',
    };
    mutation.mutate(alertData);
  };

  useEffect(() => {
    if (eventListQuery.data) {
      setEventList(eventListQuery.data.data.data);
      setTotalPages(Math.ceil(eventListQuery.data.data.total / 6));
    }
  }, [eventListQuery.data]);

  useEffect(() => {
    if (eventDetailQuery.data) {
      setSelectedEventDetail(eventDetailQuery.data.data);
    }
  }, [eventDetailQuery.data]);

  useEffect(() => {
    if (pageNum >= start + pageCount) {
      setStart((prev) => prev + pageCount);
    } else if (pageNum < start) {
      setStart((prev) => prev - pageCount);
    }
  }, [pageNum, start, pageCount]);

  return (
    <Container>
      <PageTitleContainer>
        <CustomText
          text={'밀키트 선정 완료 알림'}
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1.5rem'}
          color={COLORS.BLACK}
        />
      </PageTitleContainer>
      <ContentContainer>
        {0 < eventList.length &&
          eventList.map((event) => (
            <EventContainer key={event.eventId}>
              <EventThumbnailImage src={event.thumbnail} />
              <EventInfoWrapper>
                <CustomText
                  text={`${moment() < moment(event.enddate) ? '진행 중' : '종료'}`}
                  fontFamily={'Happiness-Sans-Bold'}
                  fontSize={'1.2rem'}
                  color={COLORS.BLACK}
                />
                <CustomText
                  text={`${moment(event.startdate).format('M')}월 상위 10개 레시피 목록입니다.`}
                  fontFamily={'Happiness-Sans-Regular'}
                  fontSize={'1rem'}
                  color={COLORS.GRAY}
                />
                <CustomText
                  text={event.title}
                  fontFamily={'Happiness-Sans-Bold'}
                  fontSize={'1.2rem'}
                  color={COLORS.BLACK}
                />
                <CustomText
                  text={`${moment(event.startdate).format('YYYY-MM-DD')} ~ ${moment(event.enddate).format('YYYY-MM-DD')}`}
                  fontFamily={'Happiness-Sans-Regular'}
                  fontSize={'1rem'}
                  color={COLORS.BLACK}
                />
              </EventInfoWrapper>
              <CustomButton
                text={'상위 10개 레시피 보기'}
                color={COLORS.WHITE}
                width={'10vw'}
                height={'4vh'}
                fontSize={'.8rem'}
                borderRadius={'20px'}
                fontFamily={'Happiness-Sans-Bold'}
                backgroundColor={COLORS.BLACK}
                borderColor={COLORS.BLACK}
                onClick={() => {
                  setSelectedEventId(event.eventId);
                  openContentModal();
                }}
              />
              <CustomButton
                text={'사용자에 알림 발송'}
                color={COLORS.WHITE}
                width={'10vw'}
                height={'4vh'}
                fontSize={'.8rem'}
                borderRadius={'20px'}
                fontFamily={'Happiness-Sans-Bold'}
                backgroundColor={COLORS.ORANGE}
                borderColor={COLORS.ORANGE}
                onClick={(e) => {
                  e.preventDefault();
                  clickEventAlert(event.eventId);
                }}
              />
            </EventContainer>
          ))}
      </ContentContainer>
      <PaginationContainer>
        {start > 1 && <MoveButton onClick={handlePrev}>이전</MoveButton>}
        {[...Array(pageCount)].map(
          (_, i) =>
            start + i <= totalPages && (
              <PaginationButton
                key={i}
                onClick={() => handlePageChange(start + i)}
                active={start + i === pageNum}
              >
                {start + i}
              </PaginationButton>
            ),
        )}
        {start + pageCount - 1 < totalPages && (
          <MoveButton onClick={handleNext}>다음</MoveButton>
        )}
      </PaginationContainer>
      <CheckModal
        show={showCompleteModal}
        onClose={closeCompleteModal}
        info={'알림 발송이 완료되었습니다.'}
        admin={true}
      />
      <CheckModal
        show={showContentModal}
        onClose={closeContentModal}
        info={selectedEventDetail?.content}
        admin={true}
      />
    </Container>
  );
};

export default AdminAlarm;
