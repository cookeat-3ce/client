import styled from 'styled-components';
import { Carousel, Skeleton } from 'antd';
import { COLORS } from '../../constants';

export const StyledCarousel = styled(Carousel).attrs({
  className: 'slick-slider sc-jCbFiK xxCXH slick-initialized',
})`
  max-width: 56vw;
  margin: 0 auto;
  max-height: 48vh;
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
  object-fit: contain;
  border-radius: inherit;
`;

export const ItemContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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

export const StyledCarouselSkeleton = styled(Skeleton.Button)`
  width: 75vw !important;
  margin: 0 auto !important;
  height: 50vh !important;
  border-radius: 40px !important;
`;

export const StyledTitleSkeleton = styled(Skeleton.Button)`
  width: 75vw !important;
  height: 1.05vw !important;
`;

export const StyledSskcookSkeleton = styled(Skeleton.Button)`
  width: 12vw !important;
  height: 42vh !important;
`;

export const StyledLongcookSkeleton = styled(Skeleton.Button)`
  width: 20vw !important;
  height: 30vh !important;
`;

export const StyledTagSkeleton = styled(Skeleton.Button)`
  width: 13vw !important;
  height: 15vh !important;
`;
