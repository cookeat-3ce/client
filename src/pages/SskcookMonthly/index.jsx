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
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import instance from '../../apis';
import { StyledSskcookSkeleton } from '../Home/styles';
import Card from '../../components/Card';
import ProfileCard from '../../components/ProfileCard';
import moment from 'moment';
const SskcookMonthly = () => {
  const location = window.location.search;
  const parsed = queryString.parse(location);
  const date = parsed.date;
  const month = moment().subtract(1, 'month').format('M');
  const [sskcookList, setSskcookList] = useState([]);

  const monthlyTopSskcookQuery = useQuery({
    queryKey: ['topSskcook', date],
    queryFn: () => sskcookAPI.monthlyLikesSskcookListAPI(date),
    staleTime: Infinity,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (monthlyTopSskcookQuery.data) {
      setSskcookList(monthlyTopSskcookQuery.data.data);
    }
  }, monthlyTopSskcookQuery.data);

  const handleItemClick = (itemId) => {
    const index = sskcookList.findIndex((item) => item.sskcookId === itemId);
    return index;
  };

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
        {sskcookList.length === 0 ? (
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
          sskcookList.map((item) => (
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
                  status="month"
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

export default SskcookMonthly;
