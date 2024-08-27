import styled from 'styled-components';
import { Carousel, Skeleton } from 'antd';
import { COLORS } from '../../constants';

export const StyledCarousel = styled(Carousel).attrs({
  className: 'slick-slider sc-jCbFiK xxCXH slick-initialized',
})`
  max-width: 75vw;
  margin: 0 auto;
  max-height: 50vh;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);

  .slick-prev,
  .slick-next {
    z-index: 1;
    color: ${COLORS.GRAPEFRUIT};
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

export const StyledSkeleton = styled(Skeleton.Button)`
  width: 75vw !important;
  margin: 0 auto !important;
  height: 50vh !important;
  border-radius: 40px !important;
`;
