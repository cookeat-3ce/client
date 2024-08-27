import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5vh;
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
`;

export const SwiperContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LoginContainer = styled.div`
  height: 40vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3vh;
`;
