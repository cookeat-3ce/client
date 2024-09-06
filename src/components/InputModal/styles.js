import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { COLORS } from '../../constants';

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 4vh 4vw;
  border-radius: 10px;
  max-width: 40vw;
`;

export const ModalTitleContainer = styled.div`
  display: flex;
  width: 50%;
  margin: 2vh 0;
  align-items: center;
  justify-content: center;
  //   border: 10px solid black;
`;

export const IngredientImageContainer = styled.div`
  display: flex;
  height: 12vh;
  gap: 0.5vw;
  // border: 10px solid black;
`;

export const IngredientImage = styled.img`
  width: ${(props) => (props.selected ? '8vw' : '4vw')};
  opacity: ${(props) => (props.selected ? 1 : 0.5)};
  transition: width 0.3s ease-in-out;
  cursor: pointer;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // border: 10px solid ${COLORS.GREEN};
`;
export const InputTextWrapper = styled.div`
  display: flex;
  margin: 2vh 0;
  align-items: center;
  gap: 1vw;
`;
export const StyledCalendarWrapper = styled.div`
  height: 44vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .react-calendar {
    width: 90%;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    padding: 3% 5%;
    background-color: white;
  }

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      color: ${COLORS.BLACK};
    }
  }

  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    justify-content: center;
  }

  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-weight: 800;
    font-size: 1rem;
  }

  /* 네비게이션 버튼 스타일 */
  .react-calendar__navigation button:focus,
  .react-calendar__navigation button:active {
    background-color: white; /* 클릭 시 배경색을 흰색으로 설정 */
    border: none; /* 테두리 제거 */
    color: ${COLORS.BLACK}; /* 텍스트 색상 설정 */
  }

  /* 네비게이션 비활성화 됐을때 스타일 */
  .react-calendar__navigation button:disabled {
    background-color: white;
    color: ${COLORS.WHITE};
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  /* 일요일에만 빨간 폰트 */
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title='일요일'] {
    color: ${COLORS.RED};
  }

  /* 오늘 날짜 폰트 컬러 */
  .react-calendar__tile--now {
    background: none;
    abbr {
      color: ${COLORS.ORANGE};
    }
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    background-color: ${COLORS.WHITE};
    padding: 0;
  }

  /* 네비게이션 현재 월 스타일 적용 */
  .react-calendar__tile--hasActive {
    background-color: ${COLORS.LIGHTORANGE};
    abbr {
      color: ${COLORS.ORANGE};
    }
  }

  /* 일 날짜 간격 */
  .react-calendar__tile {
    padding: 5px 0px 18px;
    position: relative;
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 20px 6.6667px;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${COLORS.GRAY};
  }

  /* 선택한 날짜 스타일 적용 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: ${COLORS.LIGHTORANGE};
    border-radius: 0.3rem;
  }
`;

export const StyledCalendar = styled(Calendar)``;

/* 오늘 버튼 스타일 */
export const StyledDate = styled.button`
  position: absolute;
  right: 7%;
  top: 6%;
  height: 3vh;
  background-color: ${COLORS.ORANGE};
  color: ${COLORS.WHITE};
  width: 18%;
  min-width: fit-content;
  text-align: center;
  // margin: 0 auto;
  // line-height: 1.6rem;
  border: none;
  border-radius: 15px;
  border-color: ${COLORS.ORANGE};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  font-family: 'Happiness-Sans-Bold';
`;

/* 오늘 날짜에 텍스트 삽입 스타일 */
export const StyledToday = styled.div`
  font-size: x-small;
  color: ${COLORS.GRAY};
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2vh 0 0 0;
  gap: 2vw;
  //   border: 10px solid green;
`;

export const ErrorStateContainer = styled.div`
  width: 80%;
  justify-content: left;
`;
