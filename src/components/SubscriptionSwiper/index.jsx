import React, { useRef } from 'react';
import { Container, SwiperContainer, StyledImage } from './styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';
import { Pagination, Navigation } from 'swiper';
import { subscriptionState } from '../../store';
import { useRecoilState } from 'recoil';

const CustomSwiper = ({ arr, onReachEnd }) => {
  const swiperRef = useRef(null);
  const [subscribe, setSubscribe] = useRecoilState(subscriptionState);
  const handleReachEnd = () => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      if (swiper.isEnd) {
        onReachEnd();
      }
    }
  };

  const handleClick = (slide) => {
    setSubscribe({
      username: slide.username,
      nickname: slide.nickname,
      profileImage: slide.profileImage,
    });
  };

  return (
    <Container>
      <SwiperContainer>
        <Swiper
          ref={swiperRef}
          onReachEnd={handleReachEnd}
          slidesPerView={'auto'}
          spaceBetween={20}
          pagination={false}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="subscription"
        >
          {arr.map((slide, index) => (
            <SwiperSlide key={index} className="subscription">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  borderRadius: '100%',
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
                onClick={() => handleClick(slide)}
              >
                <StyledImage src={slide.profileImage} alt={slide.username} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>
    </Container>
  );
};

export default CustomSwiper;
