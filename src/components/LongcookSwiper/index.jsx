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
import { longcookAPI } from '../../apis/longcook';
import Card from '../Card';
import ProfileCard from '../ProfileCard';
/**
 * 롱쿡 스와이퍼
 *
 * @author 양재혁
 * @version 1.0
 * @since 2024.08.28
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.08.28    양재혁       최초 생성
 * </pre>
 */
const CustomSwiper = ({ firstText, secondText, thirdText, arr }) => {
  const swiperRef = useRef(null);
  return (
    <Container>
      <TextContainer>
        <CustomText
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1.05vw'}
          color={COLORS.BLACK}
          text={firstText}
        />
        <div
          style={{
            flex: 1,
            height: '0.2vh',
            margin: '0 1vw',
            backgroundColor: `${COLORS.GRAPEFRUIT}`,
          }}
        />
        <div
          style={{
            display: 'flex',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => {
            window.location.href = `/longcook?keyword=&page=1`;
          }}
        >
          <CustomText
            text={secondText}
            fontFamily={'Happiness-Sans-Bold'}
            color={COLORS.BLACK}
            fontSize={'.8vw'}
          />
          <CustomTextButton
            text={thirdText}
            color={COLORS.GRAPEFRUIT}
            fontFamily={'Happiness-Sans-Bold'}
            fontSize={'.8vw'}
            style={{ marginLeft: '.5vw' }}
          />
        </div>
      </TextContainer>
      <SwiperContainer>
        {arr && arr.length > 0 ? (
          <Swiper
            ref={swiperRef}
            slidesPerView={'auto'}
            spaceBetween={30}
            pagination={false}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="longcook"
          >
            {arr.map((slide, index) => (
              <SwiperSlide key={index} className={'longcook'}>
                <Card
                  type="longcook"
                  url={slide.longcookUrl}
                  id={slide.longcookId}
                  color={COLORS.BLACK}
                  height="30vh"
                  deleteAPI={longcookAPI.longcookDeleteAPI}
                  queryKey="longcook"
                />
                <ProfileCard profileImage={slide.profileImage} index={slide} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div
            style={{
              height: '30vh',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CustomText
              text={'표시할 데이터가 없습니다.'}
              fontSize={'1vw'}
              fontFamily={'Happiness-Sans-Bold'}
              color={COLORS.ORANGE}
            />
          </div>
        )}
      </SwiperContainer>
    </Container>
  );
};

export default CustomSwiper;
