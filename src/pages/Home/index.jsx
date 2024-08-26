import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { sskcookAPI } from '../../apis/sskcook';
import { longcookAPI } from '../../apis/longcook';
import {
  Container,
  StyledCarousel,
  CarouselItem,
  StyledSkeleton,
} from './styles';
import image1 from '../../assets/images/example_carousel1.jpg';
import image2 from '../../assets/images/example_carousel2.jpg';
import image3 from '../../assets/images/example_carousel3.jpg';
import SskcookSwiper from '../../components/SskcookSwiper';
import LongcookSwiper from '../../components/LongcookSwiper';

const Index = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = `${year}-${formattedMonth}`;

  const recentSskcooksQuery = useQuery({
    queryKey: ['recentSskcooks'],
    queryFn: () => sskcookAPI.recentSskcookListAPI(1),
    staleTime: Infinity,
  });

  const recentLongcooksQuery = useQuery({
    queryKey: ['recentLongcooks'],
    queryFn: () => longcookAPI.recentLongcookListAPI(1),
    staleTime: Infinity,
  });

  const monthlyLikesSskcooksQuery = useQuery({
    queryKey: ['monthlyLikesSskcooks', formattedDate],
    queryFn: () => sskcookAPI.monthlyLikesSskcookListAPI(formattedDate),
    staleTime: Infinity,
  });

  const isLoading =
    recentSskcooksQuery.isLoading ||
    recentLongcooksQuery.isLoading ||
    monthlyLikesSskcooksQuery.isLoading;

  const isError =
    recentSskcooksQuery.isError ||
    recentLongcooksQuery.isError ||
    monthlyLikesSskcooksQuery.isError;

  const recentSskcooks = recentSskcooksQuery.data?.data?.sskcooks;
  const recentLongcooks = recentLongcooksQuery.data?.data?.longcooks;
  const monthlyLikesSskcooks = monthlyLikesSskcooksQuery.data?.data?.sskcooks;

  const [imagesLoaded, setImagesLoaded] = useState(false);
  // console.log(recentSskcooks);
  // console.log(recentLongcooks);
  // console.log(monthlyLikesSskcooks);

  useEffect(() => {
    const images = [image1, image2, image3];
    let loadedImages = 0;

    const handleLoad = () => {
      loadedImages += 1;
      if (loadedImages === images.length) {
        setImagesLoaded(true);
      }
    };

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.addEventListener('load', handleLoad);
      img.addEventListener('error', handleLoad);
    });

    return () => {
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleLoad);
      });
    };
  }, []);

  if (isLoading) return <StyledSkeleton />;
  if (isError) return <div>Error loading data</div>;

  return (
    <Container>
      {!imagesLoaded ? (
        <StyledSkeleton />
      ) : (
        <>
          <StyledCarousel arrows infinite autoplay>
            <CarouselItem
              imgUrl={image1}
              linkedUrl="https://www.thehandsome.com/ko/DP/planshopDetail/20477"
            />
            <CarouselItem
              imgUrl={image2}
              linkedUrl="https://www.thehandsome.com/ko/DP/planshopDetail/20561"
            />
            <CarouselItem
              imgUrl={image3}
              linkedUrl="https://www.thehandsome.com/ko/DP/planshopDetail/20561"
            />
          </StyledCarousel>
          {monthlyLikesSskcooks && (
            <SskcookSwiper
              firstText={'이번달 슥쿡'}
              secondText="더보기"
              arr={monthlyLikesSskcooks}
            />
          )}
          <SskcookSwiper
            firstText={'냉장고를 털어보자'}
            secondText={'더보기'}
            arr={monthlyLikesSskcooks}
          />
          {recentSskcooks && (
            <SskcookSwiper
              firstText={'최신순'}
              secondText={'더보기'}
              arr={recentSskcooks}
            />
          )}
          {recentLongcooks && (
            <LongcookSwiper
              firstText={'스-윽쿡'}
              secondText={'더보기'}
              arr={recentLongcooks}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default Index;
