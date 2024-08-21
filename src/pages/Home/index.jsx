import React from 'react';
import { COLORS } from '../../constants';
import CustomButton from '../../components/Button';
import { CustomInput, CustomSearchInput } from '../../components/Input';
const index = () => {
  // 예시
  const handleClick = () => console.log(1);
  return (
    <div>
      <CustomButton
        text={'안녕'}
        color={COLORS.NAVY}
        backgroundColor={COLORS.WHITE}
        width={'6vw'}
        height={'4vh'}
        fontSize={'1vw'}
        borderColor={COLORS.NAVY}
        onClick={handleClick}
      />
      <CustomInput
        type={'text'}
        text={'아이디 입력'}
        width={'30vw'}
        height={'6vh'}
        fontSize={'1vw'}
      />
      <CustomSearchInput
        type={'password'}
        text={'레시피 / 태그 / 크리에이터 검색'}
        width={'52vw'}
        height={'5vh'}
        fontSize={'1vw'}
      />
    </div>
  );
};

export default index;
