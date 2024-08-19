import React from 'react';
import { CustomInputContainer, CustomSearchInputContainer } from './styles';
import { colors } from '../../constants';
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
        border: `1px solid ${colors.tag}`,
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
        border: `1px solid ${colors.tag}`,
        backgroundImage: `url(${SearchInput})`,
        backgroundSize: '30px 30px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '21px center',
      }}
    />
  );
};
