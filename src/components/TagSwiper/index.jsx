import React, { useRef } from 'react';
import { Container, TextContainer, SwiperContainer } from './styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';
import CustomText from '../Text';
import CustomTextButton from '../Button/Text';
import { COLORS, TAG_COLOR_MAPPING } from '../../constants';
import { Pagination, Navigation } from 'swiper';
import { useCustomNavigate } from '../../hooks';
const CustomSwiper = ({ firstText, secondText, thirdText, arr }) => {
  const swiperRef = useRef(null);
  const getTagColor = (tag) => {
    return TAG_COLOR_MAPPING[tag];
  };
  const { handleChangeUrl } = useCustomNavigate();

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
        <Swiper
          ref={swiperRef}
          slidesPerView={'auto'}
          spaceBetween={60}
          pagination={false}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="tag"
        >
          {arr.map((slide, index) => (
            <SwiperSlide key={index} className="tag">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: getTagColor(slide),
                  width: '100%',
                  height: '100%',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  border: 0,
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = 'scale(1.05)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = 'scale(1)')
                }
                onClick={() => {
                  handleChangeUrl(`/sskcook?tag=${slide}`);
                }}
              >
                <CustomText
                  text={'#'}
                  fontFamily={'Happiness-Sans-Bold'}
                  color={COLORS.WHITE}
                  fontSize={'1.2vw'}
                />
                <CustomText
                  text={slide}
                  fontFamily={'Happiness-Sans-Bold'}
                  color={COLORS.WHITE}
                  fontSize={'1.2vw'}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>
    </Container>
  );
};

export default CustomSwiper;
