import React from 'react';
import { colors } from '../../constants';
import CustomButton from '../../components/Button';
import { CustomInput, CustomSearchInput } from '../../components/Input';
const index = () => {
  // 예시
  const handleClick = () => console.log(1);
  return (
    <div style={{ height: '10000px' }}>
      <CustomButton
        text={'asad'}
        color={colors.white}
        backgroundColor={colors.orange}
        width={100}
        height={50}
        fontSize={20}
        borderColor={colors.orange}
        fontFamily={'Happiness-Sans-Bold'}
        onClick={handleClick}
      />
      <CustomInput
        type={'text'}
        text={'아이디 입력'}
        width={442}
        height={71}
        fontSize={26}
        fontFamily={'Happiness-Sans-Regular'}
      />
      <CustomSearchInput
        type={'text'}
        text={'레시피 / 태그 / 크리에이터 검색'}
        width={760}
        height={60}
        fontSize={20}
        fontFamily={'Happiness-Sans-Regular'}
      />
    </div>
  );
};

export default index;
