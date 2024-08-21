import React from 'react';
import { CustomInputContainer, CustomSearchInputContainer } from './styles';
import { COLORS } from '../../constants';
import SearchInput from '../../assets/icons/searchInput.png';

export const CustomInput = ({ text, fontSize, width, height, type }) => {
  return (
    <CustomInputContainer
      type={type}
      placeholder={text}
      style={{
        fontSize,
        fontFamily: 'Happiness-Sans-Regular',
        width,
        height,
        borderRadius: 20,
        border: `1px solid ${COLORS.TAG}`,
      }}
    />
  );
};

export const CustomSearchInput = ({ text, fontSize, width, height, type }) => {
  return (
    <CustomSearchInputContainer
      type={type}
      placeholder={text}
      style={{
        fontSize,
        fontFamily: 'Happiness-Sans-Regular',
        width,
        height,
        borderRadius: 100,
        border: `1px solid ${COLORS.TAG}`,
        backgroundImage: `url(${SearchInput})`,
        backgroundSize: '1.5vw 1.5vw',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '1.5vw center',
      }}
    />
  );
};
