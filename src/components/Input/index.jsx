import React from 'react';
import { CustomInputContainer, CustomSearchInputContainer } from './styles';
import SearchInput from '../../assets/icons/input_search.svg';
import { COLORS } from '../../constants';

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
  value,
  onChange,
  onKeyDown,
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
        borderRadius: 50,
        border: `1px solid ${COLORS.TAG}`,
        backgroundImage: `url(${SearchInput})`,
        backgroundSize: '1.5vw 1.5vw',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '1vw center',
        objectFit: 'fill',
      }}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};
