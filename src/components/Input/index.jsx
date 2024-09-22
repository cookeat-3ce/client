import { React, useState } from 'react';
import {
  CustomInputContainer,
  CustomSearchInputContainer,
  CustomTextareaContainer,
  CharacterCountContainer,
} from './styles';
import SearchInput from '../../assets/icons/input_search.svg';
import { COLORS } from '../../constants';
/**
 * 공통 인풋
 *
 * @author 양재혁
 * @version 1.0
 * @since 2024.08.28
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.08.28    양재혁       최초 생성
 * </pre>
 */
export const CustomInput = ({
  text,
  fontSize,
  width,
  height,
  type,
  onChange,
  value,
}) => {
  return (
    <CustomInputContainer
      type={type}
      placeholder={text}
      value={value}
      style={{
        fontSize,
        fontFamily: 'Happiness-Sans-Regular',
        width,
        height,
        borderRadius: 5,
        border: `1px solid rgba(206, 206, 206, 0.3)`,
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

export const CustomInputTextarea = ({
  text,
  fontSize,
  width,
  height,
  maxLength,
  onChange,
  value,
  paddingLeft,
}) => {
  const [charCount, setCharCount] = useState(0);

  const handleTextareaChange = (e) => {
    setCharCount(e.target.value.length);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div style={{ position: 'relative', width }}>
      <CustomTextareaContainer
        placeholder={text}
        maxLength={maxLength}
        value={value}
        style={{
          fontSize,
          fontFamily: 'Happiness-Sans-Regular',
          width,
          height,
          borderRadius: 5,
          border: `1px solid rgba(206, 206, 206, 0.3)`,
          resize: 'none',
          padding: '10px',
        }}
        onChange={handleTextareaChange}
      />
      {maxLength && (
        <CharacterCountContainer
          style={{
            paddingLeft,
          }}
        >
          {charCount}/{maxLength}
        </CharacterCountContainer>
      )}
    </div>
  );
};
