import styled from 'styled-components';
import { COLORS } from '../../constants';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  // border: 10px solid orange;
`;

export const TopContainer = styled.div`
  height: 32vh;
  width: 72vw;
  display: flex;
  flex-direction: column;
  padding: 0 2vw;
  // border: 10px solid orange;
`;

export const TopInfoContainer = styled.div`
  height: 20vh;
  width: 72vw;
  display: flex;
  align-items: center;
  // border: 10px solid orange;
`;

export const InfoImageContainer = styled.div`
  height: 20vh;
  width: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 6vw 0 2vw;
  // border: 10px solid black;
`;

export const ImageButtonContainer = styled.div`
  height: 16vh;
  width: 30vw;
  margin: 0 4vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // border: 10px solid red;
`;

export const InfoContainer = styled.div`
  height: 16vh;
  width: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // border: 10px solid red;
`;

export const NameContianer = styled.div`
  height: 5vh;
  display: flex;
  align-items: center;
  margin: 3vh 2vw 0 2vw;
  // border: 10px solid blue;
`;

export const DetailContainer = styled.div`
  height: 5vh;
  display: flex;
  align-items: center;
  margin: 0 2vw 3vh 2vw;
  // border: 10px solid green;
`;

export const OnelinerButtonContainer = styled.div`
  height: 6vh;
  width: 60vw;
`;

export const OnelinerContainer = styled.div`
  height: 6vh;
  width: 60vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 2vh 2vw;
  padding: 1vh 0;
  // border: 10px solid green;
`;

export const BottomContainer = styled.div`
  height: 72vh;
  width: 72vw;
  display: flex;
  flex-direction: column;
  padding: 2vh 2vw;
  // border: 10px solid orange;
`;

export const TabMenuContainer = styled.div`
  height: 6vh;
  // border: 5px solid BLUE;
`;

export const TabMenuWrapperContainer = styled.div`
  height: 2vh;
  display: flex;
  justify-content: space-between;
  padding: 1vh 2vw 1vh 1vw;
  // border: 5px solid black;
`;

export const TabMenuWrapper = styled.div`
  display: flex;
  // border: 10px solid black;
`;

export const TabMenuTextWrapper = styled.div`
  width: 4vw;
  // border: 5px solid red;
`;

export const TabSeparator = styled.hr`
  border: none;
  border-top: 2px solid ${COLORS.STROKE};
  margin: 0.6vh 1.6vw;
`;

// 슥쿡 조회
export const SskcookContainer = styled.div`
  height: 32vh;
  margin: 0 2vw;
  // border: 10px solid black;
`;

// 스윽쿡(롱쿡) 조회
export const LongcookContainer = styled.div`
  height: 32vh;
  margin: 0 2vw;
  // border: 10px solid red;
`;

// 공지 조회
export const NoticeContainer = styled.div`
  height: 32vh;
  margin: 0 2vw;
  // border: 10px solid green;
`;
