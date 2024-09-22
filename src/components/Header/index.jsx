import React, { useState, useEffect, useCallback } from 'react';
import './styles';
import {
  ButtonContainer,
  Container,
  CenterWrapper,
  LogoContainer,
  Header,
  NotificationDropdown,
  NoNotifications,
  NotificationItem,
  NotificationContainer,
} from './styles';
import AlarmIcon from '../../assets/icons/alarm.svg';
import CustomTextButton from '../Button/Text';
import CustomImageButton from '../Button/Image';
import { COLORS } from '../../constants';
import { getCookie, useCustomNavigate } from '../../hooks';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { memberState } from '../../store';
import { EventSourcePolyfill } from 'event-source-polyfill';
import CustomText from '../Text';
/**
 * 메인 헤더
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
const CustomHeader = () => {
  const [showAlertDropdown, setShowAlertDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [slideNoti, setSlideNoti] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const accessToken = getCookie('accessToken');
  const { handleChangeUrl } = useCustomNavigate();
  const location = useLocation().pathname;
  const persist = useRecoilValue(memberState);

  const toggleAlertDropdown = () => {
    setShowAlertDropdown(!showAlertDropdown);
  };

  // 로컬 스토리지에서 알림 불러오기
  useEffect(() => {
    const storedNotifications =
      JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(storedNotifications);
  }, []);

  const handleNewNotice = useCallback((event) => {
    console.log('event data new notice: ', event.data);
    const notificationData = event.data;
    setSlideNoti(notificationData);
    setIsVisible(true);

    // 5초 후 슬라이드 아웃 애니메이션
    setTimeout(() => {
      setIsVisible(false);
      // 애니메이션 종료 후 알림 상태 초기화
      setTimeout(() => {
        setSlideNoti(null);
      }, 500); // 슬라이드 아웃 애니메이션 시간과 일치
    }, 5000);

    setNotifications((prevNotifications) => {
      const updatedNotifications = [notificationData, ...prevNotifications];

      // 로컬 스토리지에 알림 저장
      localStorage.setItem(
        'notifications',
        JSON.stringify(updatedNotifications),
      );

      return updatedNotifications;
    });
  }, []);

  useEffect(() => {
    if (accessToken) {
      // SSE 연결 객체
      const eventSource = new EventSourcePolyfill(
        `${process.env.REACT_APP_SERVER_URL}/alert/sse`,
        {
          headers: {
            Authorization: `${accessToken}`,
            Accept: 'text/event-stream',
          },
          heartbeatTimeout: 864000,
        },
      );

      eventSource.addEventListener('newNotice', handleNewNotice);

      // SSE 연결 중 에러
      eventSource.onerror = (error) => {
        console.error('SSE error:', error.message);
        eventSource.close(); // Close connection on error
      };

      // SSE 연결 시작 시
      eventSource.onopen = () => {
        console.log('SSE connection opened');
      };

      // SSE 연결 종료
      return () => {
        if (eventSource) {
          eventSource.removeEventListener('newNotice', handleNewNotice);
          eventSource.close();
        }
      };
    }
  }, [accessToken, handleNewNotice]);

  return (
    <Header>
      <Container>
        <CenterWrapper>
          <LogoContainer
            onClick={() => {
              handleChangeUrl('/');
            }}
            style={{ cursor: 'pointer' }}
          />
        </CenterWrapper>
        <ButtonContainer>
          {accessToken ? (
            <>
              <CustomImageButton
                src={AlarmIcon}
                width="3vh"
                height="3vh"
                onClick={toggleAlertDropdown}
              />
              <NotificationDropdown show={showAlertDropdown}>
                {notifications.length === 0 ? (
                  <NoNotifications>새로운 알림이 없습니다.</NoNotifications>
                ) : (
                  notifications.map((noti, index) => {
                    const extractContentBetweenBrackets = (noti) => {
                      const matches = noti.match(/\[(.*?)\]/);
                      return matches ? matches[1] : null;
                    };
                    const encodedItem = encodeURIComponent(
                      extractContentBetweenBrackets(noti), // [] 사이의 값
                    );
                    const priceForItem = 10000; // 가격은 정해야 할 듯

                    return (
                      <NotificationItem
                        key={index}
                        onClick={() =>
                          window.open(
                            `https://www.cookeat.site/order?orderData=${encodedItem}&priceData=${priceForItem}&discount=${10}&special=${true}`,
                            '_blank',
                            'noopener,noreferrer',
                          )
                        }
                      >
                        <CustomText
                          text="✨ 밀키트 선정 안내"
                          fontFamily="Happiness-Sans-Bold"
                          fontSize="1rem"
                          color={COLORS.ORANGE}
                        />
                        <CustomText
                          text={noti}
                          fontFamily="Happiness-Sans-Bold"
                          fontSize=".8rem"
                          color={COLORS.BLACK}
                        />
                      </NotificationItem>
                    );
                  })
                )}
              </NotificationDropdown>

              <CustomImageButton
                src={persist.profileImage}
                width="5vh"
                height="5vh"
                onClick={() => {
                  handleChangeUrl('/info');
                }}
              />
            </>
          ) : location === '/login' ? (
            <>
              <CustomTextButton
                fontSize={'1.1vw'}
                color={COLORS.BLACK}
                onClick={() => handleChangeUrl('/login')}
                style={{ display: 'none' }}
              />
              <CustomTextButton
                text={'회원가입'}
                fontSize={'1.1vw'}
                color={COLORS.BLACK}
                onClick={() => handleChangeUrl('/signup')}
              />
            </>
          ) : location === '/signup' ? (
            <>
              <CustomTextButton
                fontSize={'1.1vw'}
                color={COLORS.BLACK}
                style={{ display: 'none' }}
              />
              <CustomTextButton
                text={'로그인'}
                fontSize={'1.1vw'}
                color={COLORS.BLACK}
                onClick={() => handleChangeUrl('/login')}
              />
            </>
          ) : (
            <>
              <CustomTextButton
                text={'로그인'}
                fontSize={'1.1vw'}
                color={COLORS.BLACK}
                onClick={() => handleChangeUrl('/login')}
              />
              <CustomTextButton
                text={'회원가입'}
                fontSize={'1.1vw'}
                color={COLORS.BLACK}
                onClick={() => handleChangeUrl('/signup')}
              />
            </>
          )}
        </ButtonContainer>
      </Container>

      {isVisible && (
        <NotificationContainer isVisible={isVisible}>
          <CustomText
            text={'✨ 밀키트 선정 안내'}
            fontFamily={'Happiness-Sans-Bold'}
            fontSize={'1.2rem'}
            color={COLORS.ORANGE}
          />
          <CustomText
            text={slideNoti}
            fontFamily={'Happiness-Sans-Bold'}
            fontSize={'1rem'}
            color={COLORS.BLACK}
          />
        </NotificationContainer>
      )}
    </Header>
  );
};

export default CustomHeader;
