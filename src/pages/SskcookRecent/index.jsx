import React, { useEffect, useState } from 'react';
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
import ProfileCard from '../../components/ProfileCard';
const SskcookRecent = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['SskcookRecent'],
    queryFn: ({ pageParam = 1 }) =>
      instance
        .get(`/sskcook?sort=latest&page=${pageParam}`)
        .then((res) => res.data),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const allData = data?.pages.flatMap((page) => page.data) || [];

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

  const handleItemClick = (itemId) => {
    const index = allData.findIndex((item) => item.sskcookId === itemId);
    return index;
  };
  return (
    <Container>
      <TextContainer>
        <CustomText
          text={'최신순'}
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
              text={'최근 슥쿡이 없어요!'}
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
                  type="sskcook"
                  url={item.sskcookUrl}
                  id={item.sskcookId}
                  color={COLORS.BLACK}
                  width="12vw"
                  height="42vh"
                  deleteAPI={sskcookAPI.sskcookDeleteAPI}
                  queryKey="sskcooks"
                  status={'recent'}
                  page={handleItemClick(item.sskcookId)}
                />
                <ProfileCard profileImage={item.profileImage} index={item} />
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

export default SskcookRecent;
