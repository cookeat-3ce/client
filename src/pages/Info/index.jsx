import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  BottomContainer,
  Container,
  DetailContainer,
  ImageButtonContainer,
  InfoContainer,
  InfoImageContainer,
  LongcookContainer,
  NameContianer,
  NoticeContainer,
  OnelinerContainer,
  SskcookContainer,
  TabMenuContainer,
  TabMenuWrapper,
  TabMenuTextWrapper,
  TabMenuWrapperContainer,
  TabSeparator,
  TopContainer,
  TopInfoContainer,
} from './styles';
import ProfileImage from '../../components/ProfileImage';
import fridge_closed from '../../assets/images/fridge_closed.svg';
import { memberState } from '../../store';
import { memberAPI } from '../../apis/member';
import { useRecoilState } from 'recoil';
import CustomText from '../../components/Text';
import { useInfiniteQuery } from '@tanstack/react-query';
import { COLORS } from '../../constants';
import instance from '../../apis';
import CustomImageButton from '../../components/Button/Image';
import CustomTextButton from '../../components/Button/Text';
import CustomVideoList from '../../components/VideoList';
import CustomNoticeList from '../../components/NoticeList';
import CustomButton from '../../components/Button';
import Modal from '../../components/Modal';

const Index = () => {
  const [member] = useRecoilState(memberState);
  const username = member.username;
  const nickname = member.nickname;
  const profileImage = member.profileImage;
  const [userInfo, setUserInfo] = useState(null);
  const [userDetailInfoString, setUserDetailInfoString] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('sskcook');
  const [noticeList, setNoticeList] = useState([]);
  const [sskcookList, setSskcookList] = useState([]);
  const [longcookList, setLongcookList] = useState([]);

  const myInfoQuery = useQuery({
    queryKey: ['myInfo'],
    queryFn: () => memberAPI.myInfoAPI(username),
  });

  useEffect(() => {
    if (myInfoQuery.data?.data) {
      const userInfo = myInfoQuery.data.data;
      console.log('userInfo: ', userInfo);
      setUserInfo(userInfo);
      setUserDetailInfoString(
        `구독자 ${userInfo.subscriptionCount}명 | 슥쿡 ${userInfo.sskcookCount}개`,
      );
    }
  }, [myInfoQuery.data]);

  const {
    data: fetchedSskcookList,
    fetchNextPage: fetchSskcookNextPage,
    hasNextPage: hasSskcookNextPage,
    isFetchingNextPage: isSskcookFetching,
  } = useInfiniteQuery({
    queryKey: ['userSskcookList', username],
    queryFn: ({ pageParam = 1 }) =>
      instance
        .get(`/sskcook/list/${username}?page=${pageParam}`)
        .then((res) => {
          console.log('res: ', res.data);
          return res.data;
        }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });

  const {
    data: fetchedLongcookList,
    fetchNextPage: fetchLongcookNextPage,
    hasNextPage: hasLongcookNextPage,
    isFetchingNextPage: isLongcookFetching,
  } = useInfiniteQuery({
    queryKey: ['userLongcookList', username],
    queryFn: ({ pageParam = 1 }) =>
      instance
        .get(`/longcook/list/${username}?page=${pageParam}`)
        .then((res) => {
          console.log('res: ', res.data);
          return res.data;
        }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });

  const {
    data: fetchedNoticeList,
    fetchNextPage: fetchNoticeNextPage,
    hasNextPage: hasNoticeNextPage,
    isFetchingNextPage: isNoticeFetching,
  } = useInfiniteQuery({
    queryKey: ['userNoticeList', username],
    queryFn: ({ pageParam = 1 }) =>
      instance
        .get(`/member/${username}/notice?page=${pageParam}`)
        .then((res) => {
          console.log('res: ', res.data);
          return res.data;
        }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (fetchedSskcookList) {
      setSskcookList(fetchedSskcookList.pages.flatMap((page) => page.data));
    }
  }, [fetchedSskcookList]);

  useEffect(() => {
    if (fetchedLongcookList) {
      setLongcookList(fetchedLongcookList.pages.flatMap((page) => page.data));
    }
  }, [fetchedLongcookList]);

  useEffect(() => {
    if (fetchedNoticeList) {
      setNoticeList(fetchedNoticeList.pages.flatMap((page) => page.data));
    }
  }, [fetchedNoticeList]);

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const documentHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    if (windowHeight + scrollTop >= documentHeight - 100) {
      if (selectedMenu === 'sskcook') {
        if (hasSskcookNextPage && !isSskcookFetching) {
          fetchSskcookNextPage();
        }
      } else if (selectedMenu === 'longcook') {
        if (hasLongcookNextPage && !isLongcookFetching) {
          fetchLongcookNextPage();
        }
      } else if (selectedMenu === 'notice') {
        if (hasNoticeNextPage && !isNoticeFetching) {
          fetchNoticeNextPage();
        }
      }
    }
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleClickButton = () => {
    if (selectedMenu === 'sskcook') {
      window.location.href = '/info/sskcook/upload';
    }
    if (selectedMenu === 'longcook') {
      window.location.href = '/info/longcook/upload';
    }
    if (selectedMenu === 'notice') {
      window.location.href = '/notice/create';
    }
  };

  const handleClickFridgeButton = () => {
    window.location.href = '/myfridge';
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [
    selectedMenu,
    fetchSskcookNextPage,
    hasSskcookNextPage,
    isSskcookFetching,
    fetchLongcookNextPage,
    hasLongcookNextPage,
    isLongcookFetching,
    fetchNoticeNextPage,
    hasNoticeNextPage,
    isNoticeFetching,
  ]);

  return (
    <Container>
      <TopContainer>
        <TopInfoContainer>
          <InfoImageContainer>
            <ProfileImage
              src={profileImage}
              width="10vw"
              height="10vw"
              borderRadius="50%"
              onClick={() => console.log('image click')}
            ></ProfileImage>
            <InfoContainer>
              <NameContianer>
                <CustomText
                  fontFamily="Happiness-Sans-Bold"
                  fontSize="2rem"
                  color={COLORS.BLACK}
                  text={nickname}
                ></CustomText>
              </NameContianer>
              <DetailContainer>
                <CustomText
                  fontFamily="Happiness-Sans-Bold"
                  fontSize="1.2rem"
                  color={COLORS.BLACK}
                  text={userDetailInfoString}
                ></CustomText>
              </DetailContainer>
            </InfoContainer>
          </InfoImageContainer>
          <ImageButtonContainer>
            <CustomImageButton
              src={fridge_closed}
              width="6vw"
              height="6vw"
              borderRadius="50%"
              onClick={handleClickFridgeButton}
            ></CustomImageButton>
            <CustomText
              fontFamily="Happiness-Sans-Bold"
              fontSize="1rem"
              color={COLORS.BLACK}
              text="내 냉장고 둘러보기"
            ></CustomText>
          </ImageButtonContainer>
        </TopInfoContainer>
        <OnelinerContainer>
          <CustomText
            fontFamily="Happiness-Sans-Bold"
            fontSize="1.2rem"
            color={COLORS.BLACK}
            text="채널 한줄 소개"
          ></CustomText>
          <CustomText
            fontFamily="Happiness-Sans-Bold"
            fontSize="1rem"
            color={COLORS.BLACK}
            text={userInfo?.oneLiner || ''}
          ></CustomText>
        </OnelinerContainer>
      </TopContainer>
      <BottomContainer>
        <TabMenuContainer>
          <TabMenuWrapperContainer>
            <TabMenuWrapper>
              <TabMenuTextWrapper>
                <CustomTextButton
                  text="슥쿡"
                  onClick={() => handleMenuClick('sskcook')}
                  color={COLORS.BLACK}
                  fontSize="1.2rem"
                  fontFamily={
                    selectedMenu === 'sskcook'
                      ? 'Happiness-Sans-Bold'
                      : 'Happiness-Sans-Regular'
                  }
                ></CustomTextButton>
              </TabMenuTextWrapper>
              <TabMenuTextWrapper>
                <CustomTextButton
                  text="스윽쿡"
                  onClick={() => handleMenuClick('longcook')}
                  color={COLORS.BLACK}
                  fontSize="1.2rem"
                  fontFamily={
                    selectedMenu === 'longcook'
                      ? 'Happiness-Sans-Bold'
                      : 'Happiness-Sans-Regular'
                  }
                ></CustomTextButton>
              </TabMenuTextWrapper>
              <TabMenuTextWrapper>
                <CustomTextButton
                  text="공지"
                  onClick={() => handleMenuClick('notice')}
                  color={COLORS.BLACK}
                  fontSize="1.2rem"
                  fontFamily={
                    selectedMenu === 'notice'
                      ? 'Happiness-Sans-Bold'
                      : 'Happiness-Sans-Regular'
                  }
                ></CustomTextButton>
              </TabMenuTextWrapper>
            </TabMenuWrapper>
            <CustomButton
              text={'추가'}
              color={COLORS.WHITE}
              width={'4vw'}
              height={'3vh'}
              fontFamily={'Happiness-Sans-Bold'}
              fontSize={'1rem'}
              backgroundColor={COLORS.BLACK}
              borderRadius={'30px'}
              onClick={handleClickButton}
            ></CustomButton>
          </TabMenuWrapperContainer>
          <TabSeparator></TabSeparator>
        </TabMenuContainer>
        {selectedMenu === 'sskcook' && (
          <SskcookContainer>
            <CustomVideoList
              type={selectedMenu}
              videos={sskcookList || []}
              isInMyInfo={true}
              width={'12vw'}
              height={'42vh'}
            />
            {isSskcookFetching && <div>Loading more...</div>}
          </SskcookContainer>
        )}
        {selectedMenu === 'longcook' && (
          <LongcookContainer>
            <CustomVideoList
              type={selectedMenu}
              videos={longcookList || []}
              isInMyInfo={true}
            />
            {isLongcookFetching && <div>Loading more...</div>}
          </LongcookContainer>
        )}
        {selectedMenu === 'notice' && (
          <NoticeContainer>
            <CustomNoticeList notices={noticeList || []}></CustomNoticeList>
          </NoticeContainer>
        )}
      </BottomContainer>
    </Container>
  );
};

export default Index;
