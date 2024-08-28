import React from 'react';
import queryString from 'query-string';
import { Container, TextContainer } from './styles';
import CustomText from '../../components/Text';
import { COLORS } from '../../constants';
import { useInfiniteQuery } from '@tanstack/react-query';
import { sskcookAPI } from '../../apis/sskcook';

const Tag = () => {
  const location = window.location.search;
  const parsed = queryString.parse(location);
  const tag = parsed.tag;

  return (
    <Container>
      <TextContainer>
        <CustomText
          text={'#'}
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1.3vw'}
          color={COLORS.BLACK}
        />
        <CustomText
          text={tag || 'No tag specified'}
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1.3vw'}
          color={COLORS.BLACK}
        />
      </TextContainer>
    </Container>
  );
};

export default Tag;
