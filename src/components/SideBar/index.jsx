import React, { useEffect, useState, useCallback } from 'react';
import Event from '../../assets/icons/event.svg';
import SskCook from '../../assets/icons/sskcook.svg';
import Live from '../../assets/icons/live.svg';
import LongCook from '../../assets/icons/longcook.svg';
import Subscribe from '../../assets/icons/subscribe.svg';
import Search from '../../assets/icons/search.svg';
import Storage from '../../assets/icons/storage.svg';
import MyInfo from '../../assets/icons/myinfo.svg';
import Refrigerator from '../../assets/icons/refrigerator.svg';
import './styles';
import {
  SideBar,
  Container,
  ButtonContainer,
  ButtonWrapper,
  LogoutContainer,
} from './styles';
import { useLocation } from 'react-router-dom';
import { getCookie, useCustomNavigate, deleteAllCookies } from '../../hooks';
import CustomTextButton from '../Button/Text';
import { COLORS } from '../../constants';
import { useResetRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { memberAPI } from '../../apis/member';
import { memberState } from '../../store';
import { debounce } from 'lodash';

const CustomSideBar = () => {
  const { handleChangeUrl } = useCustomNavigate();
  const location = useLocation().pathname;
  const [filteredList, setFilteredList] = useState([]);
  const accessToken = getCookie('accessToken');
  const list = [
    { icon: SskCook, label: '슥쿡 둘러보기', path: '/' },
    { icon: Search, label: '슥쿡 검색', path: '/search' },
    { icon: Live, label: '실시간 클래스', path: '/live' },
    { icon: LongCook, label: '스-윽쿡', path: '/longcook' },
    { icon: Subscribe, label: '구독', path: '/subscription' },
    { icon: Storage, label: '보관함', path: '/stored' },
    { icon: Event, label: '이벤트', path: '/notice' },
    { icon: MyInfo, label: '내 정보', path: '/info' },
    { icon: Refrigerator, label: '냉장고 파헤치기', path: '/recommends' },
  ];
  const resetMemberState = useResetRecoilState(memberState);
  const isSskcookLocation = window.location.href.includes('/sskcook');
  const isLongcookLocation = window.location.href.includes('/longcook');
  const isSubscriptionLocation = window.location.href.includes('/subscription');
  const isLiveLocation = window.location.href.includes('/live');
  const isEventLocation = window.location.href.includes('/notice');
  const isNoticeLocation = window.location.href.includes('/notice/create');
  const isInfoLocation = window.location.href.includes('/info');
  const isMyFridge = window.location.href.includes('/myfridge');

  // 예시
  // isLogined = false;
  // isLogined = true;

  useEffect(() => {
    const filtered = list.filter((item) => {
      if (accessToken) {
        return true;
      }
      return [
        '슥쿡 둘러보기',
        '슥쿡 검색',
        '실시간 클래스',
        '스-윽쿡',
        '구독',
        '보관함',
        '이벤트',
      ].includes(item.label);
    });

    setFilteredList(filtered);
  }, [accessToken]);

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

  return (
    <SideBar>
      <Container>
        {filteredList.map((item, index) => {
          const isBottomSpecial = [3, 6, 8].includes(index);
          const isTopSpecial = [4, 7].includes(index);
          const isActive = location === item.path;
          const isSskcookLookActive =
            item.label === '슥쿡 둘러보기' &&
            isSskcookLocation &&
            !isInfoLocation;
          const isLongcookLookActive =
            item.label === '스-윽쿡' && isLongcookLocation && !isInfoLocation;
          const isSubscriptionActive =
            item.label === '구독' && isSubscriptionLocation;
          const isLiveActive = item.label === '실시간 클래스' && isLiveLocation;
          const isEventActive =
            item.label === '이벤트' && isEventLocation && !isNoticeLocation;
          const isInfoActive =
            item.label === '내 정보' &&
            (isInfoLocation || isNoticeLocation || isMyFridge);
          return (
            <ButtonContainer
              key={item.path}
              isBottomSpecial={isBottomSpecial}
              isTopSpecial={isTopSpecial}
              onClick={() => (window.location.href = item.path)}
              isActive={
                isActive ||
                isSskcookLookActive ||
                isActive ||
                isLongcookLookActive ||
                isActive ||
                isSubscriptionActive ||
                isActive ||
                isLiveActive ||
                isActive ||
                isEventActive ||
                isActive ||
                isInfoActive
              }
            >
              <ButtonWrapper>
                <img
                  src={item.icon}
                  alt={item.label}
                  style={{
                    width: '1.5vw',
                    height: '1.5vw',
                  }}
                />
                <span style={{ fontSize: '.9vw' }}>{item.label}</span>
              </ButtonWrapper>
            </ButtonContainer>
          );
        })}
      </Container>
      <LogoutContainer>
        {accessToken ? (
          <CustomTextButton
            text={'로그아웃'}
            color={COLORS.GRAY}
            onClick={debouncedLogout}
            fontSize={'0.8vw'}
            style={{
              textDecoration: 'underline',
              color: '#585858',
            }}
          />
        ) : null}
      </LogoutContainer>
    </SideBar>
  );
};

export default CustomSideBar;
