import React, { useEffect, useState } from 'react';
import {
  Container,
  TextContainer,
  SkeletonContainer,
  CardContainer,
  CardWrapper,
  CardGrid,
  InputContainer,
  TitleContainer
} from './styles';
import CustomText from '../../components/Text';
import { COLORS } from '../../constants';
import { useInfiniteQuery } from '@tanstack/react-query';
import instance from '../../apis';
import { StyledLongcookSkeleton } from '../Home/styles';
import Card from '../../components/LongcookCard';
import { CustomSearchInput } from '../../components/Input';

const LongcookList = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['LongcookList', searchQuery],  // searchValue를 queryKey에 포함
    queryFn: ({ pageParam = 1 }) =>
      instance
        .get(`/longcook?keyword=${searchQuery}&page=${pageParam}`)  // searchValue를 keyword로 사용
        .then((res) => res.data),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });

  const allData = data?.pages.flatMap((page) => page.data) || [];

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSearchQuery(event.target.value);
    }
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
          fetchNextPage();
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
          text={'스-윽쿡'}
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1.3vw'}
          color={COLORS.BLACK}
        />
      </TextContainer>
      <InputContainer>
        <CustomSearchInput
          text={'스-윽쿡 / 크리에이터 검색'}
          fontSize={'1vw'}
          width={'15vw'}
          height={'5vh'}
          type={'text'}
          onChange={handleChange}
          onKeyDown={handleKeyDown} 
          value={searchValue}
        />
      </InputContainer>
      <SkeletonContainer>
        {data && data.pages[0].total === 0 ? (
          <div
            style={{
              margin: '0 auto',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CustomText
              fontFamily={'Happiness-Sans-Bold'}
              text={'검색 결과가 없어요!'}
              fontSize={'1vw'}
              color={COLORS.DARKGRAPEFRUIT}
            />
          </div>
        ) : data === undefined ? (
          <>
            <StyledLongcookSkeleton />
            <StyledLongcookSkeleton />
            <StyledLongcookSkeleton />
            <StyledLongcookSkeleton />
            <StyledLongcookSkeleton />
            <StyledLongcookSkeleton />
            <StyledLongcookSkeleton />
            <StyledLongcookSkeleton />
            <StyledLongcookSkeleton />
          </>
        ) : (
          allData.map((item) => (
            <CardGrid key={item.longcookId}>
              <CardContainer>
                <CardWrapper>
                  <Card
                    url={item.longcookUrl}
                    type={'longcook'}
                    id={item.longcookId}
                    color={COLORS.BLACK}
                  />
                  <TitleContainer> {/* 새로 추가된 부분 */}
                  <CustomText
                    text={item.title} // 각 영상의 제목을 표시
                    fontFamily={'Happiness-Sans-Bold'}
                    fontSize={'1vw'}
                    color={COLORS.BLACK}
                  />
                </TitleContainer>
                </CardWrapper>
              </CardContainer>
            </CardGrid>
          ))
        )}
        {isFetching && (
          <>
            <StyledLongcookSkeleton />
            <StyledLongcookSkeleton />
            <StyledLongcookSkeleton />
            <StyledLongcookSkeleton />
            <StyledLongcookSkeleton />
            <StyledLongcookSkeleton />
            <StyledLongcookSkeleton />
            <StyledLongcookSkeleton />
            <StyledLongcookSkeleton />
          </>
        )}
      </SkeletonContainer>
    </Container>
  );
};

export default LongcookList;
