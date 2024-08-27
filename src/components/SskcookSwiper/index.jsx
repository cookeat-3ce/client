import React, { useRef } from 'react';
import { Container, TextContainer, SwiperContainer } from './styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';
import CustomText from '../Text';
import CustomTextButton from '../Button/Text';
import { COLORS } from '../../constants';
import { Pagination, Navigation } from 'swiper';
import Card from '../Card';
const CustomSwiper = ({ firstText, secondText, arr }) => {
  const swiperRef = useRef(null);
  console.log(arr);
  return (
    <Container>
      <TextContainer>
        <CustomText
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1.05vw'}
          color={COLORS.NAVY}
          text={firstText}
        />
        <CustomTextButton
          text={secondText}
          onClick={() => console.log(1)}
          color={COLORS.NAVY}
          fontSize={'1.05VW'}
        />
      </TextContainer>
      <SwiperContainer>
        <Swiper
          ref={swiperRef}
          slidesPerView={'auto'}
          spaceBetween={50}
          pagination={false}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {arr.map((slide, index) => (
            <SwiperSlide key={index} className={'sskcook'}>
              <Card url={slide.sskcookUrl} isSskcook={true} />
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>
    </Container>
  );
};

export default CustomSwiper;
