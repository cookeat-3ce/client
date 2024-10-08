import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import {
  Container,
  TextContainer,
  SkeletonContainer,
  CardContainer,
  CardWrapper,
} from './styles';
import { sskcookAPI } from '../../apis/sskcook';
import CustomText from '../../components/Text';
import { COLORS } from '../../constants';
import { useInfiniteQuery } from '@tanstack/react-query';
import instance from '../../apis';
import { StyledSskcookSkeleton } from '../Home/styles';
import Card from '../../components/Card';
import ProfileCard from '../../components/ProfileCard';
/**
 * 태그별 슥쿡 더보기
 *
 * @author 양재혁
 * @version 1.0
 * @since 2024.08.29
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.08.29    양재혁       최초 생성
 * </pre>
 */
const Tag = () => {
  const location = window.location.search;
  const parsed = queryString.parse(location);
  const tag = parsed.tag;

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: [tag],
    queryFn: ({ pageParam = 1 }) =>
      instance
        .get(`/sskcook?tag=${tag}&page=${pageParam}`)
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
      console.log(allData);
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
          text={'#'}
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1.3vw'}
          color={COLORS.BLACK}
        />
        <CustomText
          text={tag}
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
              text={'해당 태그의 슥쿡이 없어요!'}
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
                  height="42vh"
                  width="12vw"
                  deleteAPI={sskcookAPI.sskcookDeleteAPI}
                  queryKey="sskcooks"
                  status={`tag: ${tag}`}
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

export default Tag;
