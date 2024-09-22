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
import { useQuery } from '@tanstack/react-query';
import { eventAPI } from '../../apis/event';
import moment, { months } from 'moment';
import {
  MoveButton,
  PaginationButton,
  PaginationContainer,
} from '../Event/styles';
import CheckModal from '../../components/CheckModal';
import { SendAlertModal } from '../../components/InputModal';
import { useCustomNavigate } from '../../hooks';

const AdminAlarm = () => {
  const { handleChangeUrl } = useCustomNavigate();
  const [eventList, setEventList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [start, setStart] = useState(1);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedEventDetail, setSelectedEventDetail] = useState(null);
  const [showContentModal, setShowContentModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [filtering, setFiltering] = useState('recipe');
  const pageCount = 5;

  const eventListQuery = useQuery({
    queryKey: ['eventDetail', pageNum, filtering],
    queryFn: () => eventAPI.eventListAPI(pageNum, filtering),
    staleTime: Infinity,
  });

  const eventDetailQuery = useQuery({
    queryKey: ['eventDetail', selectedEventId],
    queryFn: () => eventAPI.eventDetailAPI(selectedEventId),
    staleTime: Infinity,
  });

  const openContentModal = () => {
    setShowContentModal(true);
  };

  const closeContentModal = () => {
    setShowContentModal(false);
  };

  const openInputModal = () => {
    setShowInputModal(true);
  };

  const closeInputModal = () => {
    setShowInputModal(false);
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

  useEffect(() => {
    if (eventListQuery.data) {
      const filteredeventList = eventListQuery.data.data.data.filter((event) =>
        event.title.includes('레시피'),
      );
      setEventList(filteredeventList);
      setTotalPages(Math.ceil(filteredeventList.length / 6));
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
              <EventThumbnailImage
                src={event.thumbnail}
                disabled={moment().month() > moment(event.enddate).month()}
                onClick={() => handleChangeUrl(`/notice/${event.eventId}`)}
              />
              <EventInfoWrapper>
                <CustomText
                  text={`${moment().month() <= moment(event.enddate).month() ? '진행 중' : '종료'}`}
                  fontFamily={'Happiness-Sans-Bold'}
                  fontSize={'1.4rem'}
                  color={
                    moment().month() <= moment(event.enddate).month()
                      ? COLORS.ORANGE
                      : COLORS.LIGHTGRAY
                  }
                />
                <CustomText
                  text={event.title}
                  fontFamily={'Happiness-Sans-Bold'}
                  fontSize={'1.4rem'}
                  color={
                    moment().month() <= moment(event.enddate).month()
                      ? COLORS.BLACK
                      : COLORS.LIGHTGRAY
                  }
                />
                <CustomText
                  text={`${moment(event.startdate).format('YYYY-MM-DD')} ~ ${moment(event.enddate).format('YYYY-MM-DD')}`}
                  fontFamily={'Happiness-Sans-Regular'}
                  fontSize={'1.2rem'}
                  color={
                    moment().month() <= moment(event.enddate).month()
                      ? COLORS.BLACK
                      : COLORS.LIGHTGRAY
                  }
                />
              </EventInfoWrapper>
              <CustomButton
                text={'상위 10개 레시피 목록 보기'}
                color={COLORS.WHITE}
                width={'14vw'}
                height={'5vh'}
                fontSize={'1rem'}
                borderRadius={'30px'}
                fontFamily={'Happiness-Sans-Bold'}
                backgroundColor={
                  moment().month() <= moment(event.enddate).month()
                    ? COLORS.BLACK
                    : COLORS.LIGHTGRAY
                }
                borderColor={
                  moment().month() <= moment(event.enddate).month()
                    ? COLORS.BLACK
                    : COLORS.LIGHTGRAY
                }
                disabled={moment().month() > moment(event.enddate).month()}
                onClick={() => {
                  setSelectedEventId(event.eventId);
                  openContentModal();
                }}
              />
              <CustomButton
                text={'사용자에 알림 발송'}
                color={COLORS.WHITE}
                width={'12vw'}
                height={'5vh'}
                fontSize={'1rem'}
                borderRadius={'30px'}
                fontFamily={'Happiness-Sans-Bold'}
                backgroundColor={
                  moment().month() <= moment(event.enddate).month()
                    ? COLORS.ORANGE
                    : COLORS.LIGHTGRAY
                }
                borderColor={
                  moment().month() <= moment(event.enddate).month()
                    ? COLORS.ORANGE
                    : COLORS.LIGHTGRAY
                }
                disabled={moment().month() > moment(event.enddate).month()}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedEventId(event.eventId);
                  openInputModal();
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
        show={showContentModal}
        onClose={closeContentModal}
        info={selectedEventDetail?.content}
        title={selectedEventDetail?.title}
        admin={true}
      />
      <SendAlertModal
        show={showInputModal}
        onClose={closeInputModal}
        eventId={selectedEventId}
      />
    </Container>
  );
};

export default AdminAlarm;
