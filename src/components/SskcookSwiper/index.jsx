import React, { useRef } from 'react';
import {
  Container,
  TextContainer,
  SwiperContainer,
  LoginContainer,
  LoginWrapper,
} from './styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';
import CustomText from '../Text';
import CustomTextButton from '../Button/Text';
import { COLORS } from '../../constants';
import { Pagination, Navigation } from 'swiper';
import Card from '../Card';
import ProfileCard from '../ProfileCard';
import CustomButton from '../Button';
import { sskcookAPI } from '../../apis/sskcook';
import { getCookie, useCustomNavigate } from '../../hooks';
import moment from 'moment';
const CustomSwiper = ({
  firstText,
  secondText,
  thirdText,
  arr,
  isLogined,
  now,
  page,
}) => {
  const swiperRef = useRef(null);
  const { handleChangeUrl } = useCustomNavigate();
  const lastMonth = moment().subtract(1, 'month').format('YYYY-MM');
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
            if (now === 'month') {
              window.location.href = `/sskcook?date=${lastMonth}`;
            } else if (now === 'recent') {
              window.location.href = `/sskcook?sort=latest`;
            } else {
              window.location.href = '/recommends';
            }
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
        {isLogined === 'fridge' && !getCookie('accessToken') ? (
          <LoginContainer>
            <LoginWrapper>
              <CustomText
                text="로그인이 필요한 서비스예요!"
                fontSize="1.3vw"
                fontFamily="Happiness-Sans-Regular"
                color={COLORS.BLACK}
              />
              <CustomButton
                text="로그인 하러 가기"
                fontSize="1vw"
                width="12vw"
                height="5vh"
                color={COLORS.WHITE}
                borderRadius="20px"
                fontFamily="Happiness-Sans-Regular"
                backgroundColor={COLORS.DARKGRAPEFRUIT}
                borderColor={COLORS.DARKGRAPEFRUIT}
                onClick={() => handleChangeUrl('/login')}
              />
            </LoginWrapper>
          </LoginContainer>
        ) : arr && arr.length > 0 ? (
          <Swiper
            ref={swiperRef}
            slidesPerView="auto"
            spaceBetween={50}
            pagination={false}
            navigation
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {arr.map((slide, index) => (
              <SwiperSlide key={index} className="sskcook">
                <Card
                  type="sskcook"
                  url={slide.sskcookUrl}
                  id={slide.sskcookId}
                  color={COLORS.BLACK}
                  width="12vw"
                  height="42vh"
                  deleteAPI={sskcookAPI.sskcookDeleteAPI}
                  queryKey="sskcooks"
                  status={now}
                  page={page}
                />
                <ProfileCard profileImage={slide.profileImage} index={slide} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : arr && arr.length === 0 ? (
          <LoginContainer>
            <LoginWrapper>
              <CustomText
                text="내 냉장고에 아무것도 없어요!"
                fontSize="1.3vw"
                fontFamily="Happiness-Sans-Regular"
                color={COLORS.BLACK}
              />
              <CustomButton
                text="재료 등록하러 가기"
                fontSize="1vw"
                width="12vw"
                height="5vh"
                color={COLORS.WHITE}
                borderRadius="20px"
                fontFamily="Happiness-Sans-Regular"
                backgroundColor={COLORS.DARKGRAPEFRUIT}
                borderColor={COLORS.DARKGRAPEFRUIT}
                onClick={() => handleChangeUrl('/myfridge')}
              />
            </LoginWrapper>
          </LoginContainer>
        ) : (
          <div
            style={{
              height: '35vh',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CustomText
              text="표시할 데이터가 없습니다."
              fontSize="1vw"
              fontFamily="Happiness-Sans-Bold"
              color={COLORS.ORANGE}
            />
          </div>
        )}
      </SwiperContainer>
    </Container>
  );
};

export default CustomSwiper;
