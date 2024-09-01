import { React, useState } from 'react';
import { CustomInputContainer, CustomSearchInputContainer, CustomTextareaContainer, CharacterCountContainer} from './styles';
import SearchInput from '../../assets/icons/searchInput.png';

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

export const CustomInputTextarea = ({
  text,
  fontSize,
  width,
  height,
  maxLength,
  onChange,
  value,
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
        <CharacterCountContainer>
          {charCount}/{maxLength}
        </CharacterCountContainer>
      )}
    </div>
  );
}