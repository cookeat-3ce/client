import React, { useEffect, useState } from 'react';
import {
  Container,
  TextContainer,
  SkeletonContainer,
  CardContainer,
  CardWrapper,
} from '../Tag/styles';
import CustomText from '../../components/Text';
import { COLORS } from '../../constants';
import { useInfiniteQuery } from '@tanstack/react-query';
import instance from '../../apis';
import { StyledSskcookSkeleton } from '../Home/styles';
import Card from '../../components/Card';
import ProfileCard from '../../components/ProfileCard';
import { sskcookAPI } from '../../apis/sskcook';

const Stored = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['Stored'],
    queryFn: ({ pageParam = 1 }) =>
      instance.get(`/member/sskcook?page=${pageParam}`).then((res) => res.data),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const allData = data?.pages.flatMap((page) => page.data) || [];
  // console.log(data.pages[0].total);
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
  // console.log(data.pages[0].total);
  return (
    <Container>
      <TextContainer>
        <CustomText
          text={'저장한 슥쿡 목록'}
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
              text={'저장된 슥쿡이 없어요!'}
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
                <CardWrapper>
                  <Card
                    key={item}
                    type={'sskcook'}
                    url={item.sskcookUrl}
                    id={item.sskcookId}
                    color={COLORS.BLACK}
                    deleteAPI={sskcookAPI.sskcookDeleteAPI}
                    queryKey="sskcooks"
                  />
                  <ProfileCard
                    profileImage={item.profileImage}
                    index={item}
                    profile={false}
                  />
                </CardWrapper>
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

export default Stored;
