import React, { useCallback, useEffect, useState } from 'react';
import {
  HeaderContainer,
  HeaderInner,
  HeaderText,
  ContentContainer,
  HeaderTitle,
  HeaderTextContainer,
} from '../Order/styles';
import { ContentInner, ContentBigText, ContentSmallText } from './styles';
import { getCookie, deleteAllCookies } from '../../hooks';
import { useMutation } from '@tanstack/react-query';
import { memberAPI } from '../../apis/member';
import { useCustomNavigate } from '../../hooks';
import { memberState } from '../../store';
import { useResetRecoilState, useRecoilValue } from 'recoil';
import { debounce } from 'lodash';
import Logo from '../../assets/icons/hyundai_logo.png';
import CheckCircle from '../../assets/icons/check_circle.svg';
import CustomButton from '../../components/Button';
const OrderDone = () => {
  const [num, setNum] = useState(null);
  const { handleChangeUrl } = useCustomNavigate();
  const accessToken = getCookie('accessToken');
  const resetMemberState = useResetRecoilState(memberState);
  const member = useRecoilValue(memberState);
  const mutation = useMutation({
    mutationFn: async () => {
      await memberAPI.logoutAPI();
    },
    onSuccess: () => {
      resetMemberState();
      deleteAllCookies();
      handleChangeUrl('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const debouncedLogout = useCallback(
    debounce(() => {
      mutation.mutate();
    }, 300),
    [],
  );

  function generateRandom14DigitNumber() {
    const min = 10000000000000;
    const max = 99999999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    const randomNum = generateRandom14DigitNumber();
    setNum(randomNum);
  }, []);
  return (
    <>
      <HeaderContainer>
        <HeaderInner>
          <img
            src={Logo}
            alt="Hyundai icon"
            style={{ cursor: 'pointer' }}
            onClick={() =>
              (window.location.href =
                'https://tohome.thehyundai.com/front/dp/dpa/dawnHome.do')
            }
          ></img>
          <HeaderTextContainer>
            {accessToken ? (
              <>
                <HeaderText onClick={debouncedLogout}>로그아웃</HeaderText>
                <HeaderText>회원정보변경</HeaderText>
                <HeaderText
                  onClick={() => {
                    handleChangeUrl('/info');
                  }}
                >
                  마이페이지
                </HeaderText>
                <HeaderText
                  onClick={() =>
                    (window.location.href =
                      'https://tohome.thehyundai.com/front/dp/dpf/customerCenterMain.do')
                  }
                >
                  고객센터
                </HeaderText>
              </>
            ) : (
              <>
                <HeaderText
                  onClick={() => {
                    handleChangeUrl('/login');
                  }}
                >
                  로그인
                </HeaderText>
                <HeaderText
                  onClick={() => {
                    handleChangeUrl('/signup');
                  }}
                >
                  회원가입
                </HeaderText>
                <HeaderText>마이페이지</HeaderText>
                <HeaderText
                  onClick={() =>
                    (window.location.href =
                      'https://tohome.thehyundai.com/front/dp/dpf/customerCenterMain.do')
                  }
                >
                  고객센터
                </HeaderText>
              </>
            )}
          </HeaderTextContainer>
        </HeaderInner>
      </HeaderContainer>
      <ContentContainer>
        <HeaderTitle>주문완료</HeaderTitle>
        <ContentInner>
          <img src={CheckCircle} alt="CheckCircle Icon" />
          {accessToken ? (
            <div
              style={{
                marginTop: '1vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1vw',
              }}
            >
              <ContentBigText>
                {member.nickname}고객님, 감사합니다.
              </ContentBigText>
              <ContentBigText>주문을 완료했습니다.</ContentBigText>
              <ContentSmallText>주문번호 {num}</ContentSmallText>
            </div>
          ) : (
            <div>
              <div>
                <ContentBigText>비회원고객님, 감사합니다.</ContentBigText>
                <ContentBigText>주문을 완료했습니다.</ContentBigText>
                <ContentSmallText>주문번호 {num}</ContentSmallText>
              </div>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1vw',
              marginTop: '3vw',
            }}
          >
            <CustomButton
              text={'쇼핑하기'}
              width="15vw"
              height="5vh"
              onClick={() =>
                (window.location.href =
                  'https://tohome.thehyundai.com/front/dp/dpa/dawnHome.do')
              }
              borderColor="#e7e7e7"
              backgroundColor="#e7e7e7"
              fontFamily="Noto Sans KR"
              fontSize="1vw"
            />
            <CustomButton
              text={'닫기'}
              onClick={() => window.close()}
              borderColor="#FF6913"
              backgroundColor="#FF6913"
              color="#ffffff"
              width="15vw"
              height="5vh"
              fontFamily="Noto Sans KR"
              fontSize="1vw"
            />
          </div>
        </ContentInner>
      </ContentContainer>
    </>
  );
};

export default OrderDone;
