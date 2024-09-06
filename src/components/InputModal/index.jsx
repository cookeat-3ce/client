import React, { useEffect, useState } from 'react';
import {
  ButtonGroup,
  IngredientImage,
  IngredientImageContainer,
  InputTextWrapper,
  ModalBackdrop,
  ModalContent,
  ModalTitleContainer,
  StyledCalendarWrapper,
  StyledCalendar,
  StyledToday,
  InputContainer,
} from './styles';
import { useRecoilState } from 'recoil';
import { memberState } from '../../store';
import { COLORS } from '../../constants';
import CustomButton from '../Button';
import CustomText from '../Text';
import { CustomInput } from '../Input';
import icon_fruit from '../../assets/icons/fruit.svg';
import icon_egg from '../../assets/icons/egg.svg';
import icon_etc from '../../assets/icons/etc.svg';
import icon_seafood from '../../assets/icons/seafood.svg';
import icon_vegi from '../../assets/icons/vegi.svg';
import icon_meat from '../../assets/icons/meat.svg';
import { fridgeAPI } from '../../apis/fridge';
import { useCustomNavigate } from '../../hooks';
import { useMutation } from '@tanstack/react-query';
import moment from 'moment/moment';

const InputModal = ({ show, onClose, onSubmit }) => {
  const [member] = useRecoilState(memberState);
  const username = member.username;
  const { handleChangeUrl } = useCustomNavigate();
  const [selectedIngreidentType, setSelectedIngreidentType] = useState(0);
  const [ingredientName, setIngredientName] = useState(null);
  const [ingredientAmount, setIngredientAmount] = useState(null);
  const today = new Date();
  const [expiredDate, setExpiredDate] = useState(today);

  const addIngredientData = {
    username: username,
    name: ingredientName,
    amount: ingredientAmount,
    icon: selectedIngreidentType,
    expdate: expiredDate,
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      await fridgeAPI.addIngredientAPI(data);
    },
    onSuccess: (response) => {
      console.log(response);
      handleChangeUrl('/myfridge');
      onClose();
    },
    onError: (error) => {
      console.error('Error adding ingredient:', error);
    },
  });

  useEffect(() => {
    setSelectedIngreidentType(0);
  }, []);

  if (!show) return null;

  const handleChangeInputName = (e) => {
    setIngredientName(e.target.value);
  };

  const handleChangeInputAmount = (e) => {
    setIngredientAmount(e.target.value);
  };

  const handleDateChange = (newDate) => {
    console.log('newDate: ', moment(newDate).format('YYYY-MM-DD HH:mm:ss'));
    setExpiredDate(newDate);
  };

  const handleSubmitButtonClick = () => {
    console.log('data: ', addIngredientData);
    mutation.mutate(addIngredientData);
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitleContainer>
          <CustomText
            text={'재료 등록하기'}
            fontFamily="Happiness-Sans-Bold"
            fontSize="1.2rem"
            color={COLORS.BLACK}
          />
        </ModalTitleContainer>
        <IngredientImageContainer>
          {/* 1 */}
          <IngredientImage
            src={icon_fruit}
            selected={selectedIngreidentType === 1}
            onClick={() => setSelectedIngreidentType(1)}
          />
          {/* 2 */}
          <IngredientImage
            src={icon_vegi}
            selected={selectedIngreidentType === 2}
            onClick={() => setSelectedIngreidentType(2)}
          />
          {/* 3 */}
          <IngredientImage
            src={icon_meat}
            selected={selectedIngreidentType === 3}
            onClick={() => setSelectedIngreidentType(3)}
          />
          {/* 4 */}
          <IngredientImage
            src={icon_seafood}
            selected={selectedIngreidentType === 4}
            onClick={() => setSelectedIngreidentType(4)}
          />
          {/* 5 */}
          <IngredientImage
            src={icon_egg}
            selected={selectedIngreidentType === 5}
            onClick={() => setSelectedIngreidentType(5)}
          />
          {/* 0 */}
          <IngredientImage
            src={icon_etc}
            selected={selectedIngreidentType === 0}
            onClick={() => setSelectedIngreidentType(0)}
          />
        </IngredientImageContainer>
        <InputContainer>
          <InputTextWrapper>
            <CustomText
              text={'재료'}
              fontFamily="Happiness-Sans-Bold"
              fontSize="1rem"
              color={COLORS.BLACK}
            />
            <CustomInput
              text={'이름'}
              fontSize={'.8rem'}
              width={'12vw'}
              height={'4vh'}
              type={'text'}
              onChange={handleChangeInputName}
            ></CustomInput>
            <CustomInput
              text={'양'}
              fontSize={'.8rem'}
              width={'6vw'}
              height={'4vh'}
              type={'text'}
              onChange={handleChangeInputAmount}
            ></CustomInput>
          </InputTextWrapper>
          <StyledCalendarWrapper>
            <StyledCalendar
              value={expiredDate}
              onChange={handleDateChange}
              formatDay={(locale, date) => moment(date).format('D')} // 일 제거 숫자만 보이게
              formatYear={(locale, date) => moment(date).format('YYYY')} // 네비게이션 눌렀을때 숫자 년도만 보이게
              formatMonthYear={(locale, date) =>
                moment(date).format('YYYY . MM')
              } // 네비게이션에서 2024. 09 이렇게 보이도록 설정
              showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
              next2Label={null} // +1년 & +10년 이동 버튼 숨기기
              prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
              minDetail="year" // 10년단위 년도 숨기기
              tileContent={({ date, view }) => {
                let html = [];
                if (
                  view === 'month' &&
                  date.getMonth() === today.getMonth() &&
                  date.getDate() === today.getDate()
                ) {
                  html.push(<StyledToday key={'today'}>오늘</StyledToday>);
                }
                return <>{html}</>;
              }}
            />
          </StyledCalendarWrapper>
        </InputContainer>
        <ButtonGroup>
          <CustomButton
            text={'취소'}
            color={COLORS.ORANGE}
            width={'4vw'}
            height={'3vh'}
            fontSize={'.8rem'}
            borderRadius={'20px'}
            fontFamily={'Happiness-Sans-Bold'}
            backgroundColor={COLORS.WHITE}
            borderColor={COLORS.ORANGE}
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          />
          <CustomButton
            text={'등록'}
            color={COLORS.WHITE}
            width={'4vw'}
            height={'3vh'}
            fontSize={'.8rem'}
            borderRadius={'20px'}
            fontFamily={'Happiness-Sans-Bold'}
            backgroundColor={COLORS.ORANGE}
            borderColor={COLORS.ORANGE}
            onClick={(e) => {
              e.preventDefault();
              handleSubmitButtonClick();
            }}
          />
        </ButtonGroup>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default InputModal;
