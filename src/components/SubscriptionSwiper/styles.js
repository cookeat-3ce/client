import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3vh;
`;

export const SwiperContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledImage = styled.img`
  border-radius: 50%;
  object-fit: fill;
  width: 100%;
  height: 100%;
`;
