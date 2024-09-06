import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import {
  Container,
  TextContainer,
  SkeletonContainer,
  CardContainer,
  CardWrapper,
} from '../Tag/styles';
import { sskcookAPI } from '../../apis/sskcook';
import CustomText from '../../components/Text';
import { COLORS } from '../../constants';
import { useInfiniteQuery } from '@tanstack/react-query';
import instance from '../../apis';
import { StyledSskcookSkeleton } from '../Home/styles';
import Card from '../../components/Card';
const SskcookMonthly = () => {
  const location = window.location.search;
  const parsed = queryString.parse(location);
  const date = parsed.date;
  const today = new Date();
  const month = today.getMonth() + 1;
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: [date],
    queryFn: ({ pageParam = 1 }) =>
      instance
        .get(`/sskcook?date=${date}&page=${pageParam}`)
        .then((res) => res.data),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const allData = data?.pages.flatMap((page) => page.data) || [];
  const handleItemClick = (itemId) => {
    const index = allData.findIndex((item) => item.sskcookId === itemId);
    return index;
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const documentHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;

      if (windowHeight + scrollTop >= documentHeight - 1) {
        if (hasNextPage && !isFetching) {
          setIsLoading(true);
          fetchNextPage().finally(() => setIsLoading(false));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchNextPage, hasNextPage, isFetching]);

  return (
    <Container>
      <TextContainer>
        <CustomText
          text={`${month}월의 인기 슥쿡`}
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1.3vw'}
          color={COLORS.BLACK}
        />
      </TextContainer>
      <SkeletonContainer>
        {data && data.pages[0].total === 0 ? (
          <div
            style={{
              height: '50vh',
              margin: '0 auto',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CustomText
              fontFamily={'Happiness-Sans-Bold'}
              text={'이번 달 인기 있는 슥쿡이 없어요!'}
              fontSize={'1.5vw'}
              color={COLORS.DARKGRAPEFRUIT}
            />
          </div>
        ) : data === undefined ? (
          <>
            <StyledSskcookSkeleton />
            <StyledSskcookSkeleton />
            <StyledSskcookSkeleton />
            <StyledSskcookSkeleton />
            <StyledSskcookSkeleton />
            <StyledSskcookSkeleton />
            <StyledSskcookSkeleton />
            <StyledSskcookSkeleton />
            <StyledSskcookSkeleton />
            <StyledSskcookSkeleton />
          </>
        ) : (
          allData.map((item) => (
            <CardContainer key={item.sskcookId}>
              <CardWrapper>
                <Card
                  url={item.sskcookUrl}
                  type={'sskcook'}
                  id={item.sskcookId}
                  color={COLORS.BLACK}
                  deleteAPI={sskcookAPI.sskcookDeleteAPI}
                  queryKey="sskcooks"
                  status="month"
                  page={handleItemClick(item.sskcookId)}
                />
              </CardWrapper>
            </CardContainer>
          ))
        )}

        {isLoading && (
          <>
            <StyledSskcookSkeleton />
            <StyledSskcookSkeleton />
            <StyledSskcookSkeleton />
            <StyledSskcookSkeleton />
            <StyledSskcookSkeleton />
            <StyledSskcookSkeleton />
            <StyledSskcookSkeleton />
            <StyledSskcookSkeleton />
            <StyledSskcookSkeleton />
            <StyledSskcookSkeleton />
          </>
        )}
      </SkeletonContainer>
    </Container>
  );
};

export default SskcookMonthly;
