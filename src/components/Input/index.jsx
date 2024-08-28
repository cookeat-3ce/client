import React from 'react';
import { CustomInputContainer, CustomSearchInputContainer } from './styles';
import { COLORS } from '../../constants';
import SearchInput from '../../assets/icons/searchInput.png';

export const CustomInput = ({
  text,
  fontSize,
  width,
  height,
  type,
  onChange,
}) => {
  return (
    <CustomInputContainer
      type={type}
      placeholder={text}
      style={{
        fontSize,
        fontFamily: 'Happiness-Sans-Regular',
        width,
        height,
        borderRadius: 10,
        border: `1px solid rgba(206, 206, 206, 0.5)`,
      }}
      onChange={onChange}
    />
  );
};

export const CustomSearchInput = ({
  text,
  fontSize,
  width,
  height,
  type,
  onChange,
}) => {
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
        border: `1px solid rgba(206, 206, 206, 0.5)`,
        backgroundImage: `url(${SearchInput})`,
        backgroundSize: '1.5vw 1.5vw',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '1.5vw center',
      }}
      onChange={onChange}
    />
  );
};
