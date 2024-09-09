import React, { useState, useEffect } from 'react';
import {
  BottomContainer,
  Container,
  DetailContainer,
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
} from '../Info/styles';
import { ImageButtonContainer } from './styles';
import ProfileImage from '../../components/ProfileImage';
import CustomText from '../../components/Text';
import { useInfiniteQuery } from '@tanstack/react-query';
import { COLORS } from '../../constants';
import instance from '../../apis';
import CustomTextButton from '../../components/Button/Text';
import CustomVideoList from '../../components/VideoList';
import CustomNoticeList from '../../components/NoticeList';
import SubscriptionSwiper from '../../components/SubscriptionSwiper/index';
import { subscriptionState } from '../../store';
import { useRecoilValue } from 'recoil';
import CustomButton from '../../components/Button/';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { memberAPI } from '../../apis/member';
import { memberState } from '../../store';
import { useQuery } from '@tanstack/react-query';

const Subscription = () => {
  const [userDetailInfoString, setUserDetailInfoString] = useState('');
  const [userDetailOneLiner, setUserDetailOneLiner] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('sskcook');
  const [noticeList, setNoticeList] = useState([]);
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [sskcookList, setSskcookList] = useState([]);
  const [longcookList, setLongcookList] = useState([]);
  const [isSubscriptionClicked, setIsSubscriptionClicked] = useState(false);
  const subscription = useRecoilValue(subscriptionState);
  const member = useRecoilValue(memberState);

  const [currentSubscription, setCurrentSubscription] = useState({
    username: subscription.username,
    nickname: subscription.nickname,
    profileImage: subscription.profileImage,
  });

  useEffect(() => {
    setCurrentSubscription({
      username: subscription.username,
      nickname: subscription.nickname,
      profileImage: subscription.profileImage,
    });
  }, [subscription]);

  const myInfoQuery = useQuery({
    queryKey: ['myInfo', currentSubscription.username],
    queryFn: () => memberAPI.myInfoAPI(currentSubscription.username),
  });

  useEffect(() => {
    if (myInfoQuery.data) {
      setUserDetailInfoString(
        `구독자 ${myInfoQuery.data.data.subscriptionCount}명 | 슥쿡 ${myInfoQuery.data.data.sskcookCount}개`,
      );
      setUserDetailOneLiner(myInfoQuery.data.data.oneLiner);
    }
  }, [myInfoQuery.data]);

  const {
    data: fetchedSubscriptionList,
    fetchNextPage: fetchSubscriptionNextPage,
    hasNextPage: hasSubscriptionNextPage,
    isFetchingNextPage: isSubscriptionFetching,
  } = useInfiniteQuery({
    queryKey: ['userSubscriptionList'],
    queryFn: ({ pageParam = 1 }) =>
      instance.get(`/member/subscription?page=${pageParam}`).then((res) => {
        return res.data;
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });

  const {
    data: fetchedSskcookList,
    fetchNextPage: fetchSskcookNextPage,
    hasNextPage: hasSskcookNextPage,
    isFetchingNextPage: isSskcookFetching,
  } = useInfiniteQuery({
    queryKey: ['userSskcookList', currentSubscription.username],
    queryFn: ({ pageParam = 1 }) =>
      instance
        .get(`/sskcook/list/${currentSubscription.username}?page=${pageParam}`)
        .then((res) => {
          return res.data;
        }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    enabled: !!currentSubscription.username,
  });

  const {
    data: fetchedLongcookList,
    fetchNextPage: fetchLongcookNextPage,
    hasNextPage: hasLongcookNextPage,
    isFetchingNextPage: isLongcookFetching,
  } = useInfiniteQuery({
    queryKey: ['userLongcookList', currentSubscription.username],
    queryFn: ({ pageParam = 1 }) =>
      instance
        .get(`/longcook/list/${currentSubscription.username}?page=${pageParam}`)
        .then((res) => {
          return res.data;
        }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    enabled: !!currentSubscription.username,
  });

  const {
    data: fetchedNoticeList,
    fetchNextPage: fetchNoticeNextPage,
    hasNextPage: hasNoticeNextPage,
    isFetchingNextPage: isNoticeFetching,
  } = useInfiniteQuery({
    queryKey: ['userNoticeList', currentSubscription.username],
    queryFn: ({ pageParam = 1 }) =>
      instance
        .get(`/member/${currentSubscription.username}/notice?page=${pageParam}`)
        .then((res) => {
          return res.data;
        }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    enabled: !!currentSubscription.username,
  });

  const subscriptionMutation = useMutation({
    mutationFn: async ({ followingUsername, followerUsername }) => {
      try {
        const response = await memberAPI.subscriptionAPI({
          followingUsername,
          followerUsername,
        });
        return response.data;
      } catch (error) {
        throw new Error('Error');
      }
    },
    onSuccess: (response) => {
      if (response === 1) message.success('구독 성공!', 5);
      else message.error('구독 취소!', 5);
    },
    onError: () => {
      message.error('구독 실패!', 5);
    },
  });

  useEffect(() => {
    if (fetchedSubscriptionList) {
      setSubscriptionList(
        fetchedSubscriptionList.pages.flatMap((page) => page.data),
      );
    }
  }, [fetchedSubscriptionList]);

  useEffect(() => {
    if (fetchedSubscriptionList) {
      const subscriptions = fetchedSubscriptionList.pages.flatMap(
        (page) => page.data,
      );
      if (subscriptions.length > 0) {
        setCurrentSubscription({
          username: subscriptions[0].username,
          nickname: subscriptions[0].nickname,
          profileImage: subscriptions[0].profileImage,
        });
      }
    }
  }, [fetchedSubscriptionList]);

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

  const handleReachEnd = () => {
    if (hasSubscriptionNextPage && !isSubscriptionFetching) {
      fetchSubscriptionNextPage();
    }
  };
  return (
    <Container>
      <CustomText
        text={'구독목록'}
        fontSize={'1.3vw'}
        fontFamily={'Happiness-Sans-Bold'}
        color={COLORS.BLACK}
      />
      {currentSubscription.username ? (
        <>
          <SubscriptionSwiper
            arr={subscriptionList.map((item) => ({
              username: item.username,
              profileImage: item.profileImage,
              nickname: item.nickname,
            }))}
            onReachEnd={handleReachEnd}
          />
          <div style={{ margin: '0.6vh 1.6vw' }}>
            <TabSeparator></TabSeparator>
          </div>
          <div style={{ marginTop: '3vh' }}>
            <TopContainer>
              <TopInfoContainer>
                <InfoImageContainer>
                  <ProfileImage
                    src={currentSubscription.profileImage}
                    width="10vw"
                    height="10vw"
                    borderRadius="50%"
                    onClick={() =>
                      (window.location.href = `/subscription/${currentSubscription.username}`)
                    }
                  ></ProfileImage>
                  <InfoContainer>
                    <NameContianer>
                      <CustomText
                        fontFamily="Happiness-Sans-Bold"
                        fontSize="2rem"
                        color={COLORS.BLACK}
                        text={currentSubscription.nickname}
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
                  {isSubscriptionClicked ? (
                    <CustomButton
                      text={'구독'}
                      onClick={() => {
                        setIsSubscriptionClicked(!isSubscriptionClicked);
                        subscriptionMutation.mutate({
                          followingUsername: currentSubscription.username,
                          followerUsername: member.username,
                        });
                      }}
                      color={COLORS.WHITE}
                      backgroundColor={COLORS.BLACK}
                      width={'5vw'}
                      height={'5vh'}
                      borderColor={COLORS.BLACK}
                      fontFamily={'Happiness-Sans-Bold'}
                      borderRadius={'100px'}
                    />
                  ) : (
                    <CustomButton
                      text={'구독중'}
                      onClick={() => {
                        setIsSubscriptionClicked(!isSubscriptionClicked);
                        subscriptionMutation.mutate({
                          followingUsername: currentSubscription.username,
                          followerUsername: member.username,
                        });
                      }}
                      color={COLORS.BLACK}
                      backgroundColor={COLORS.WHITE}
                      width={'5vw'}
                      height={'5vh'}
                      borderColor={COLORS.BLACK}
                      fontFamily={'Happiness-Sans-Bold'}
                      borderRadius={'100px'}
                    />
                  )}
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
                  text={userDetailOneLiner || ''}
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
                </TabMenuWrapperContainer>
                <TabSeparator></TabSeparator>
              </TabMenuContainer>
              {selectedMenu === 'sskcook' && (
                <SskcookContainer>
                  <CustomVideoList
                    type={selectedMenu}
                    videos={sskcookList || []}
                    isInMyInfo={false}
                    status={`subscribe: ${currentSubscription.username}`}
                    width={'10vw'}
                    height={'35vh'}
                  />
                  {isSskcookFetching && <div>Loading more...</div>}
                </SskcookContainer>
              )}
              {selectedMenu === 'longcook' && (
                <LongcookContainer>
                  <CustomVideoList
                    type={selectedMenu}
                    videos={longcookList || []}
                    isInMyInfo={false}
                  />
                  {isLongcookFetching && <div>Loading more...</div>}
                </LongcookContainer>
              )}
              {selectedMenu === 'notice' && (
                <NoticeContainer>
                  <CustomNoticeList
                    notices={noticeList || []}
                  ></CustomNoticeList>
                </NoticeContainer>
              )}
            </BottomContainer>
          </div>
        </>
      ) : (
        <div style={{ width: '70vw' }}>
          <div
            style={{
              marginTop: '3vh',
              height: '50vh',
              margin: '0 auto',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CustomText
              fontFamily={'Happiness-Sans-Bold'}
              text={'구독한 유저가 없어요!'}
              fontSize={'1.5vw'}
              color={COLORS.DARKGRAPEFRUIT}
            />
          </div>
        </div>
      )}
    </Container>
  );
};

export default Subscription;
