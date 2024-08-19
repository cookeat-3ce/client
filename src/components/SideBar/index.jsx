import React, { useEffect, useState } from 'react';
import Event from '../../assets/icons/event.png';
import SskCook from '../../assets/icons/sskcook.png';
import Live from '../../assets/icons/live.png';
import LongCook from '../../assets/icons/longcook.png';
import Subscribe from '../../assets/icons/subscribe.png';
import Search from '../../assets/icons/search.png';
import Storage from '../../assets/icons/storage.png';
import MyInfo from '../../assets/icons/myinfo.png';
import Refrigerator from '../../assets/icons/refrigerator.png';
import './styles';
import { SideBar, Container, ButtonContainer, ButtonWrapper } from './styles';
import { useLocation } from 'react-router-dom';
import { useCustomNavigate } from '../../hooks';

const CustomSideBar = ({ isLogined }) => {
  const { handleChangeUrl } = useCustomNavigate();
  const location = useLocation().pathname;
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    console.log(location);
  }, [location]);

  const list = [
    { icon: SskCook, label: '슥쿡 둘러보기', path: '/' },
    { icon: Search, label: '슥쿡 검색', path: '/' },
    { icon: Live, label: '실시간 클래스', path: '/live' },
    { icon: LongCook, label: '스-윽쿡', path: '/' },
    { icon: Subscribe, label: '구독', path: '/' },
    { icon: Storage, label: '보관함', path: '/' },
    { icon: Event, label: '이벤트', path: '/' },
    { icon: MyInfo, label: '내 정보', path: '/' },
    { icon: Refrigerator, label: '냉장고 파헤치기', path: '/' },
  ];

  // 예시
  isLogined = false;
  // isLogined = true;

  useEffect(() => {
    const filtered = list.filter((item) => {
      if (isLogined) {
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
  }, [isLogined]);

  return (
    <SideBar>
      <Container>
        {filteredList.map((item, index) => {
          const isBottomSpecial = [3, 6, 8].includes(index);
          const isTopSpecial = [4, 7].includes(index);
          const isActive = location === item.path;
          return (
            <ButtonContainer
              key={item.path}
              isBottomSpecial={isBottomSpecial}
              isTopSpecial={isTopSpecial}
              onClick={() => handleChangeUrl(item.path)}
              isActive={isActive}
            >
              <ButtonWrapper>
                <img
                  src={item.icon}
                  alt={item.label}
                  width={'30px'}
                  height={'30px'}
                />
                <span>{item.label}</span>
              </ButtonWrapper>
            </ButtonContainer>
          );
        })}
      </Container>
    </SideBar>
  );
};

export default CustomSideBar;
