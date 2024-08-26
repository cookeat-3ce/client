import React, { useState, useEffect } from 'react';
import { Container, StyledCarousel, CarouselItem } from './styles';
import image1 from '../../assets/images/example_carousel1.jpg';
import image2 from '../../assets/images/example_carousel2.jpg';
import Recipe from '../../components/Recipe';
const Index = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const img1 = new Image();
    const img2 = new Image();
    img1.src = image1;
    img2.src = image2;

    img1.onload = img2.onload = () => setImagesLoaded(true);
  }, []);

  if (!imagesLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <StyledCarousel arrows infinite autoplay>
        <CarouselItem
          imgUrl={image1}
          linkedUrl="https://www.thehandsome.com/ko/DP/planshopDetail/20477"
        />
        <CarouselItem
          imgUrl={image2}
          linkedUrl="https://www.thehandsome.com/ko/DP/planshopDetail/20561"
        />
      </StyledCarousel>
      <Recipe />
    </Container>
  );
};

export default Index;
