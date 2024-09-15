import React, { useEffect, useState } from 'react';
import {
  Container,
  ContentContainer,
  EventContainer,
  EventInfoWrapper,
  EventListContainer,
  EventThumbnailImage,
  PageTitleContainer,
  PaginationButton,
  PaginationContainer,
  MoveButton,
} from './styles';
import CustomText from '../../components/Text';
import { COLORS } from '../../constants';
import { useQuery } from '@tanstack/react-query';
import { eventAPI } from '../../apis/event';
import moment from 'moment';
import { useCustomNavigate } from '../../hooks';

const Event = () => {
  const { handleChangeUrl } = useCustomNavigate();
  const [eventList, setEventList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [start, setStart] = useState(1);
  const pageCount = 5;

  const eventListQuery = useQuery({
    queryKey: ['eventDetail', pageNum],
    queryFn: () => eventAPI.eventListAPI(pageNum),
    staleTime: Infinity,
  });

  const handleThumbnailClick = (id) => {
    handleChangeUrl(`/notice/${id}`);
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
      setEventList(eventListQuery.data.data.data);
      setTotalPages(Math.ceil(eventListQuery.data.data.total / 6));
    }
  }, [eventListQuery.data]);

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
          text={'공지사항 목록'}
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1.5rem'}
          color={COLORS.BLACK}
        />
      </PageTitleContainer>
      <ContentContainer>
        <EventListContainer>
          {0 < eventList.length &&
            eventList.map((event) => (
              <EventContainer key={event.eventId}>
                <EventThumbnailImage
                  src={event.thumbnail}
                  onClick={() => handleThumbnailClick(event.eventId)}
                />
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
              </EventContainer>
            ))}
        </EventListContainer>
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
    </Container>
  );
};

export default Event;
