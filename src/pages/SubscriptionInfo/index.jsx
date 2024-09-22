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
import ProfileImage from '../../components/ProfileImage';
import { ImageButtonContainer } from '../Subscription/styles';
import CustomButton from '../../components/Button';
import CustomText from '../../components/Text';
import { COLORS } from '../../constants';
import CustomTextButton from '../../components/Button/Text';
import CustomVideoList from '../../components/VideoList';
import CustomNoticeList from '../../components/NoticeList';
import { memberAPI } from '../../apis/member';
import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import instance from '../../apis';
import { useRecoilValue } from 'recoil';
import { memberState } from '../../store';
import { getCookie } from '../../hooks';
import { useCustomNavigate } from '../../hooks';
/**
 * 상대 프로필
 *
 * @author 양재혁
 * @version 1.0
 * @since 2024.09.03
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.09.03    양재혁       최초 생성
 * </pre>
 */
const SubscriptionInfo = () => {
  const { handleChangeUrl } = useCustomNavigate();
  const [userDetailInfoString, setUserDetailInfoString] = useState('');
  const [userDetailOneLiner, setUserDetailOneLiner] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('sskcook');
  const [noticeList, setNoticeList] = useState([]);
  const [sskcookList, setSskcookList] = useState([]);
  const [longcookList, setLongcookList] = useState([]);
  const [isSubscriptionClicked, setIsSubscriptionClicked] = useState(false);
  const { username } = useParams();
  const member = useRecoilValue(memberState);

  useEffect(() => {
    if (username === member.username) {
      handleChangeUrl('/info');
    }
  }, []);

  const myInfoQuery = useQuery({
    queryKey: ['myInfo', username],
    queryFn: () => memberAPI.myInfoAPI(username),
  });

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
        .then((res) => res.data),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.next ? allPages.length + 1 : undefined,
    onSuccess: (data) => {
      if (data?.pages) {
        setSskcookList(data.pages.flatMap((page) => page.data));
      }
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
        .then((res) => res.data),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.next ? allPages.length + 1 : undefined,
    onSuccess: (data) => {
      if (data?.pages) {
        setLongcookList(data.pages.flatMap((page) => page.data));
      }
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
        .then((res) => res.data),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.next ? allPages.length + 1 : undefined,
    onSuccess: (data) => {
      if (data?.pages) {
        setNoticeList(data.pages.flatMap((page) => page.data));
      }
    },
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
    onSuccess: (response) => {},
  });

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

  useEffect(() => {
    if (myInfoQuery.data) {
      setUserDetailInfoString(
        `구독자 ${myInfoQuery.data.data.subscriptionCount}명 | 슥쿡 ${myInfoQuery.data.data.sskcookCount}개`,
      );
      setUserDetailOneLiner(myInfoQuery.data.data.oneLiner);
      if (myInfoQuery.data.data.followStatus === 'Not Following')
        setIsSubscriptionClicked(false);
      else setIsSubscriptionClicked(true);
    }
  }, [myInfoQuery.data]);

  return (
    <Container>
      <TopContainer>
        <TopInfoContainer>
          <InfoImageContainer>
            {myInfoQuery.data?.data?.profileImage && (
              <ProfileImage
                src={myInfoQuery.data.data.profileImage}
                width="10vw"
                height="10vw"
                borderRadius="50%"
              />
            )}
            <InfoContainer>
              <NameContianer>
                <CustomText
                  fontFamily="Happiness-Sans-Bold"
                  fontSize="2rem"
                  color={COLORS.BLACK}
                  text={myInfoQuery.data?.data?.nickname || 'Nickname'}
                />
              </NameContianer>
              <DetailContainer>
                <CustomText
                  fontFamily="Happiness-Sans-Bold"
                  fontSize="1.2rem"
                  color={COLORS.BLACK}
                  text={userDetailInfoString || ''}
                />
              </DetailContainer>
            </InfoContainer>
          </InfoImageContainer>
          <ImageButtonContainer>
            {!isSubscriptionClicked ? (
              <CustomButton
                text={'구독'}
                onClick={() => {
                  if (getCookie('accessToken')) {
                    setIsSubscriptionClicked(!isSubscriptionClicked);
                    subscriptionMutation.mutate({
                      followingUsername: username,
                      followerUsername: member.username,
                    });
                  }
                }}
                color={COLORS.WHITE}
                backgroundColor={COLORS.BLACK}
                width={'5vw'}
                height={'5vh'}
                fontSize={'1rem'}
                borderColor={COLORS.BLACK}
                fontFamily={'Happiness-Sans-Bold'}
                borderRadius={'100px'}
              />
            ) : (
              <CustomButton
                text={'구독중'}
                onClick={() => {
                  if (getCookie('accessToken')) {
                    setIsSubscriptionClicked(!isSubscriptionClicked);
                    subscriptionMutation.mutate({
                      followingUsername: username,
                      followerUsername: member.username,
                    });
                  }
                }}
                color={COLORS.BLACK}
                backgroundColor={COLORS.WHITE}
                width={'5vw'}
                height={'5vh'}
                fontSize={'1rem'}
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
          />
          <CustomText
            fontFamily="Happiness-Sans-Bold"
            fontSize="1rem"
            color={COLORS.BLACK}
            text={userDetailOneLiner || ''}
          />
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
                />
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
                />
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
                />
              </TabMenuTextWrapper>
            </TabMenuWrapper>
          </TabMenuWrapperContainer>
          <TabSeparator />
        </TabMenuContainer>
        {selectedMenu === 'sskcook' && (
          <SskcookContainer>
            <CustomVideoList
              type={selectedMenu}
              videos={sskcookList || []}
              isInMyInfo={false}
              status={`subscribe: ${myInfoQuery?.data?.data.username}`}
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
              isInMyInfo={false}
              width={'15vw'}
              height={'12vw'}
            />
            {isLongcookFetching && <div>Loading more...</div>}
          </LongcookContainer>
        )}
        {selectedMenu === 'notice' && (
          <NoticeContainer>
            <CustomNoticeList notices={noticeList || []} />
          </NoticeContainer>
        )}
      </BottomContainer>
    </Container>
  );
};

export default SubscriptionInfo;
