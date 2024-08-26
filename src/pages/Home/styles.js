import styled from 'styled-components';
import { Carousel } from 'antd';
import { COLORS } from '../../constants';

export const StyledCarousel = styled(Carousel).attrs({
  className: 'slick-slider sc-jCbFiK xxCXH slick-initialized',
})`
  max-width: 75vw;
  margin: 0 auto;
  max-height: 50vh;
  overflow: hidden;
  cursor: pointer;
  border-radius: 40px;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);

  .slick-prev,
  .slick-next {
    z-index: 1;
    width: 5vh;
    height: 5vh;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    color: ${COLORS.YELLOW};
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }

  .slick-next::after {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(135deg);
  }

  .slick-prev::after {
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 80vh;
  object-fit: fill;
  border-radius: inherit;
`;

export const ItemContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  border-radius: inherit;
`;

export const CarouselItem = ({ imgUrl, linkedUrl }) => {
  return (
    <ItemContainer onClick={() => window.open(linkedUrl, '_blank')}>
      <StyledImage src={imgUrl} alt="Carousel Item" />
    </ItemContainer>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
