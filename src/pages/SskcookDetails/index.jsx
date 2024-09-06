import React, { useState, useEffect, useRef } from 'react';
import {
  SwitchContainer,
  StyledSwitch,
  DetailsContainer,
  VideoContainer,
  WriteContainer,
  TagContainer,
  TagInner,
  IngredientContainer,
  IngredientInner,
  IngredientWrapper,
  IngredientSection,
  LineContainer,
  RecipeContainer,
  RecipeInner,
  SubscriptionContainer,
  StyledSkeleton,
  SwitchSkeleton,
} from './styles';
import CustomText from '../../components/Text';
import { COLORS } from '../../constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import { sskcookAPI } from '../../apis/sskcook';
import { memberState } from '../../store';
import { useRecoilState } from 'recoil';
import CustomButton from '../../components/Button';
import ReactPlayer from 'react-player/lazy';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import Share from '../../assets/icons/share.svg';
import Bookmark from '../../assets/icons/bookmark.svg';
import Like from '../../assets/icons/thumbs_up.svg';
import Siren from '../../assets/icons/siren.svg';
import ClickedShare from '../../assets/icons/clicked_share.svg';
import ClickedBookmark from '../../assets/icons/clicked_bookmark.svg';
import ClickedLike from '../../assets/icons/clicked_thumbs_up.svg';
import ClickedSiren from '../../assets/icons/clicked_siren.svg';
import Pause from '../../assets/icons/pause.svg';
import Play from '../../assets/icons/play.svg';
import Link from '../../assets/icons/link.svg';
import KakaoIcon from '../../assets/icons/kakao.svg';
import { getCookie } from '../../hooks';
import { message, Menu, Dropdown } from 'antd';
import { memberAPI } from '../../apis/member';
import CustomImageButton from '../../components/Button/Image';
import { useCustomNavigate } from '../../hooks';
import LeftArrow from '../../assets/icons/left_arrow.svg';
import { useLocation } from 'react-router-dom';
import instance from '../../apis';
import { useInfiniteQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
const SskcookDetails = () => {
  const sskcookId = window.location.pathname.split('/').pop();
  const [member, setMember] = useRecoilState(memberState);
  const [isSirenClicked, setIsSirenClicked] = useState(false);
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [isShareClicked, setIsShareClicked] = useState(false);
  const [isBookmarkClicked, setIsBookmarkClicked] = useState(false);
  const [isSubscriptionClicked, setIsSubscriptionClicked] = useState(false);
  const { Kakao } = window;
  const playerRef = useRef(null);
  const { handleChangeUrl } = useCustomNavigate();
  const { transcript } = useSpeechRecognition();
  const location = useLocation();
  const state = location.state;
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = `${year}-${formattedMonth}`;
  console.log('State 값:', state);
  const [isPlaying, setIsPlaying] = useState(true);
  const word = transcript.split(' ');
  const [keyword, setKeyword] = useState('');
  const [flag, setFlag] = useState('');
  const [page, setPage] = useState('');
  useEffect(() => {
    const stateValue = state.key;
    const stateString = state.key.status;

    if (stateString === 'recent') {
      setFlag(1);
      setPage(stateValue.transformedPage);
    } else if (stateString === 'month') {
      setFlag(2);
      setPage(stateValue.transformedPage);
    } else if (stateString === 'stored') {
      setFlag(3);
      setPage(stateValue.transformedPage);
    } else if (stateString.substring(0, 10) === 'subscribe_') {
      setFlag(4);
      setKeyword(stateString.substring(11, stateString.length));
      setPage(stateValue.transformedPage);
    } else if (stateString.substring(0, 14) === 'search_recent:') {
      setFlag(5);
      setKeyword(stateString.substring(15, stateString.length));
      setPage(stateValue.transformedPage);
    } else if (stateString.substring(0, 4) === 'tag:') {
      setFlag(6);
      setKeyword(stateString.substring(5, stateString.length));
      setPage(stateValue.transformedPage);
    } else {
      setFlag(7);
      setKeyword(stateString.substring(14, stateString.length));
      setPage(stateValue.transformedPage);
    }
  }, []);

  // console.log(flag, keyword);

  // console.log(page);

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init(process.env.REACT_APP_KAKAO_INIT_KEY);
  }, []);

  const {
    data: recentData,
    fetchNextPage: recentFetchNextPage,
    hasNextPage: recentHasNextPage,
    isFetching: recentIsFetching,
    hasPreviousPage: recentHasPrevPage,
    fetchPreviousPage: recentFetchPrevPage,
  } = useInfiniteQuery({
    queryKey: ['SskcookRecent'],
    queryFn: ({ pageParam = page }) =>
      instance
        .get(`/sskcook?sort=latest&page=${pageParam}`)
        .then((res) => res.data),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      return firstPage.prev ? allPages.length + 1 : undefined;
    },
    enabled: flag === 1,
  });

  const {
    data: dateData,
    fetchNextPage: dateFetchNextPage,
    hasNextPage: dateHasNextPage,
    isFetching: dateIsFetching,
  } = useInfiniteQuery({
    queryKey: [formattedDate],
    queryFn: ({ pageParam = 1 }) =>
      instance
        .get(`/sskcook?date=${formattedDate}&page=${pageParam}`)
        .then((res) => res.data),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      return firstPage.prev ? allPages.length - 1 : undefined;
    },
    enabled: flag === 2,
  });

  const {
    data: fetchedSskcookList,
    fetchNextPage: fetchSskcookNextPage,
    hasNextPage: hasSskcookNextPage,
    isFetchingNextPage: isSskcookFetching,
  } = useInfiniteQuery({
    queryKey: ['userSskcookList', keyword],
    queryFn: ({ pageParam = 1 }) =>
      instance.get(`/sskcook/list/${keyword}?page=${pageParam}`).then((res) => {
        // console.log('res: ', res.data);
        return res.data;
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      return firstPage.prev ? allPages.length + 1 : undefined;
    },
    enabled: flag === 4,
  });

  const {
    data: recentSearchData,
    fetchNextPage: fetchNextPageRecent,
    hasNextPage: hasNextPageRecent,
    isFetching: isFetchingRecent,
  } = useInfiniteQuery({
    queryKey: ['SskcookRecentSearch'],
    queryFn: ({ pageParam = 1 }) =>
      instance
        .get(`/sskcook?keyword=${keyword}&sort=latest&page=${pageParam}`)
        .then((res) => res.data),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      return firstPage.prev ? allPages.length - 1 : undefined;
    },
    enabled: flag === 5,
  });

  const {
    data: likeData,
    fetchNextPage: fetchNextPageLike,
    hasNextPage: hasNextPageLike,
    isFetching: isFetchingLike,
  } = useInfiniteQuery({
    queryKey: ['SskcookLikeSearch'],
    queryFn: ({ pageParam = 1 }) =>
      instance
        .get(`/sskcook?keyword=${keyword}&sort=likes&page=${pageParam}`)
        .then((res) => res.data),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      return firstPage.prev ? allPages.length - 1 : undefined;
    },
    enabled: flag === 7,
  });

  const {
    data: tagData,
    fetchNextPage: tagFetchNextPage,
    hasNextPage: tagHasNextPage,
    isFetching: tagIsFetching,
  } = useInfiniteQuery({
    queryKey: ['tag', keyword],
    queryFn: ({ pageParam = 1 }) =>
      instance
        .get(`/sskcook?tag=${keyword}&page=${pageParam}`)
        .then((res) => res.data),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      return firstPage.prev ? allPages.length - 1 : undefined;
    },
    enabled: flag === 6,
  });

  const {
    data: storeData,
    fetchNextPage: storeFetchNextPage,
    hasNextPage: storeHasNextPage,
    isFetching: storeIsFetching,
  } = useInfiniteQuery({
    queryKey: ['Stored'],
    queryFn: ({ pageParam = 1 }) =>
      instance.get(`/member/sskcook?page=${pageParam}`).then((res) => res.data),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      return firstPage.prev ? allPages.length - 1 : undefined;
    },
    enabled: flag === 3,
  });

  const [recentAllData, setRecentAllData] = useState([]);

  useEffect(() => {
    if (recentData?.pages) {
      const allData = recentData.pages.flatMap((page) => page.data);
      setRecentAllData(allData);
    }
  }, [recentData]);

  const likesAllData = likeData?.pages.flatMap((page) => page.data) || [];
  const tagAllData = tagData?.pages.flatMap((page) => page.data) || [];
  const storeAllData = storeData?.pages.flatMap((page) => page.data) || [];
  const recentSearchAllData =
    recentSearchData?.pages.flatMap((page) => page.data) || [];
  const fetchedSskcookAllData =
    fetchedSskcookList?.pages.flatMap((page) => page.data) || [];
  const dateAllData = dateData?.pages.flatMap((page) => page.data) || [];
  // console.log(recentAllData, Number(sskcookId));
  let index = recentAllData?.findIndex(
    (item) => item.sskcookId === Number(sskcookId),
  );
  console.log('여기', index);
  console.log(recentAllData);
  const handleScroll = async () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.scrollHeight;

    if (scrollTop === 0 && recentAllData?.length > 0) {
      console.log(index);
      if (flag === 1) {
        if (index > -1) {
          index--;
        }
        if (index >= 0) {
          const currentItem = recentAllData[index];
          if (currentItem) {
            handleChangeUrl(`/sskcook/${currentItem?.sskcookId}`);
          }
        } else if (recentHasPrevPage && !recentIsFetching) {
          const page = await recentFetchPrevPage();
          console.log(page);
          index = recentAllData?.length - 1;
          const currentItem = recentAllData[index];
          if (currentItem) {
            handleChangeUrl(`/sskcook/${currentItem?.sskcookId}`);
          }
        }
      }
    }
    // 맨 아래
    else if (
      scrollTop + windowHeight >= bodyHeight &&
      recentAllData?.length > 0
    ) {
      if (flag === 1) {
        if (index < recentAllData?.length) {
          index++;
          const currentItem = recentAllData[index];
          if (currentItem) {
            handleChangeUrl(`/sskcook/${currentItem?.sskcookId}`);
          }
        }
        if (
          index >= recentAllData?.length &&
          recentHasNextPage &&
          !recentIsFetching
        ) {
          console.log('여기 인덱스', index);
          const pages = await recentFetchNextPage();
          console.log(pages);
          const newRecentData =
            pages?.data?.pages[pages?.data?.pages?.length - 1]?.data || [];
          console.log(newRecentData);
          setRecentAllData((prevData) => [...prevData, ...newRecentData]);
          // Update index to be consistent with newly fetched data
          index = recentAllData?.length - 1;
        }
      } else if (flag === 2 && dateHasNextPage && !dateIsFetching) {
        dateFetchNextPage();
      } else if (flag === 4 && hasSskcookNextPage && !isSskcookFetching) {
        fetchSskcookNextPage();
      } else if (flag === 5 && hasNextPageRecent && !isFetchingRecent) {
        fetchNextPageRecent();
      } else if (flag === 7 && hasNextPageLike && !isFetchingLike) {
        fetchNextPageLike();
      } else if (flag === 6 && tagHasNextPage && !tagIsFetching) {
        tagFetchNextPage();
      } else if (flag === 3 && storeHasNextPage && !storeIsFetching) {
        storeFetchNextPage();
      }
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [
    flag,
    recentAllData,
    recentFetchNextPage,
    recentHasNextPage,
    recentIsFetching,
    recentHasPrevPage,
    recentFetchPrevPage,
    dateFetchNextPage,
    dateHasNextPage,
    dateIsFetching,
    fetchSskcookNextPage,
    hasSskcookNextPage,
    isSskcookFetching,
    fetchNextPageRecent,
    hasNextPageRecent,
    isFetchingRecent,
    fetchNextPageLike,
    hasNextPageLike,
    isFetchingLike,
    tagFetchNextPage,
    tagHasNextPage,
    tagIsFetching,
    storeFetchNextPage,
    storeHasNextPage,
    storeIsFetching,
  ]);

  const likeMutation = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await sskcookAPI.LikeAPI(data);
        return response;
      } catch (error) {
        throw new error('Error');
      }
    },
    onSuccess: (response) => {
      if (response.data === 'likes added') {
        message.success('좋아요!', 5);
      } else {
        message.error('좋아요 취소!', 5);
      }
    },
  });

  const reportMutation = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await sskcookAPI.ReportAPI(data);
        return response;
      } catch (error) {
        throw new error('Error');
      }
    },
    onSuccess: (response) => {
      if (response.data === 'report added') {
        message.success('신고 등록!', 5);
      } else {
        message.error('신고 취소!', 5);
      }
    },
  });

  const storeMutation = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await memberAPI.storeAPI(data);
        return response;
      } catch (error) {
        throw new error('Error');
      }
    },
    onSuccess: (response) => {
      if (response.data === 'store added') {
        message.success('보관!', 5);
      } else {
        message.error('보관 취소!', 5);
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
    onSuccess: (response) => {
      // console.log(response);
      if (response === 1) message.success('구독 성공!', 5);
      else message.error('구독 취소!', 5);
    },
    onError: () => {
      message.error('구독 실패!', 5);
    },
  });

  const checking = () => {
    const lastWord = word[word.length - 1];

    if (lastWord === '멈춰') {
      setIsPlaying(false);
    } else if (lastWord === '실행') {
      setIsPlaying(true);
    } else if (lastWord === '뒤로') {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime - 5);
    }
  };

  useEffect(() => {
    if (member.audio) {
      SpeechRecognition.startListening({ continuous: true, language: 'ko' });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [member.audio]);

  useEffect(() => {
    checking();
  }, [transcript]);

  const { data: sskcookDetailsData, isLoading } = useQuery({
    queryKey: ['sskccokDetails', sskcookId],
    queryFn: () => sskcookAPI.sskcookDetailsAPI(sskcookId),
  });

  useEffect(() => {
    if (!sskcookDetailsData) return;

    if (sskcookDetailsData?.data?.details[0]?.followStatus === 'Following')
      setIsSubscriptionClicked(true);
    else setIsSubscriptionClicked(false);

    if (sskcookDetailsData?.data?.details[0]?.likeStatus === 'Liked')
      setIsLikeClicked(true);
    else setIsLikeClicked(false);

    if (sskcookDetailsData?.data?.details[0]?.storeStatus === 'Saved')
      setIsBookmarkClicked(true);
    else setIsBookmarkClicked(false);

    if (sskcookDetailsData?.data?.details[0]?.reportStatus === 'Reported')
      setIsSirenClicked(true);
    else setIsSirenClicked(false);
  }, [sskcookDetailsData]);

  if (isLoading) {
    return (
      <>
        <SwitchContainer>
          <SwitchSkeleton />
        </SwitchContainer>
        <div
          style={{
            width: '60vw',
            height: '78vh',
            marginLeft: '7vw',
            position: 'relative',
            borderRadius: '20px',
          }}
        >
          <StyledSkeleton />
        </div>
      </>
    );
  }

  const accessToken = getCookie('accessToken');

  const onChange = (checked) => {
    setMember((prevState) => ({ ...prevState, audio: checked }));
  };

  const handleCopy = (copyText) => {
    navigator.clipboard
      .writeText(copyText)
      .then(() => message.success('주소 복사 성공!', 5), console.log(copyText))
      .catch((err) => message.error('주소 복사 실패!', 5));
  };

  const shareKakao = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${sskcookDetailsData?.data?.details[0]?.title}`,
        description: `${sskcookDetailsData?.data?.details[0]?.recipe}`,
        imageUrl: 'https://ifh.cc/g/lzPj16.png',
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      itemContent: {
        profileText: `${sskcookDetailsData?.data?.details[0]?.nickname}`,
      },
      social: {
        likeCount: Number(sskcookDetailsData?.data?.details[0]?.likeCount),
      },
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => handleCopy(window.location.href)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5vw' }}>
          <img src={Link} alt="Link Icon" />
          <CustomText
            text={'URL 복사'}
            fontFamily={'Happiness-Sans-Regular'}
            fontSize={'.7vw'}
            color={COLORS.BLACK}
          />
        </div>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => shareKakao()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5vw' }}>
          <img src={KakaoIcon} alt="Kakao Icon" />
          <CustomText
            text={'카카오톡 공유'}
            fontFamily={'Happiness-Sans-Regular'}
            fontSize={'.7vw'}
            color={COLORS.BLACK}
          />
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <SwitchContainer>
        <CustomText
          text={'멈춰!'}
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1vw'}
          color={COLORS.BLACK}
        />
        <StyledSwitch checked={member.audio} onChange={onChange} />
      </SwitchContainer>
      <DetailsContainer>
        <VideoContainer onClick={() => setIsPlaying(!isPlaying)}>
          <ReactPlayer
            url={sskcookDetailsData?.data?.details[0]?.sskcookUrl}
            width="100%"
            height="100%"
            muted={false}
            controls={false}
            playing={isPlaying}
            loop={true}
            ref={playerRef}
          />
        </VideoContainer>
        {isSirenClicked ? (
          <div
            style={{
              position: 'absolute',
              zIndex: '1',
              cursor: 'pointer',
              left: '53vw',
              top: '55vh',
            }}
            onClick={() => {
              if (accessToken) {
                setIsSirenClicked(!isSirenClicked);
                reportMutation.mutate(sskcookId);
              } else {
                message.warning('로그인이 필요한 서비스예요!', 5);
              }
            }}
          >
            <img src={ClickedSiren} alt="ClickedSiren Icon" />
          </div>
        ) : (
          <div
            style={{
              position: 'absolute',
              zIndex: '1',
              cursor: 'pointer',
              left: '53vw',
              top: '55vh',
            }}
            onClick={() => {
              if (accessToken) {
                setIsSirenClicked(!isSirenClicked);
                reportMutation.mutate(sskcookId);
              } else {
                message.warning('로그인이 필요한 서비스예요!', 5);
              }
            }}
          >
            <img src={Siren} alt="Siren Icon" />
          </div>
        )}
        {isLikeClicked ? (
          <div
            style={{
              position: 'absolute',
              zIndex: '1',
              cursor: 'pointer',
              bottom: '-10vh',
              left: '53vw',
            }}
            onClick={() => {
              if (accessToken) {
                setIsLikeClicked(!isLikeClicked);
                likeMutation.mutate(sskcookId);
              } else {
                message.warning('로그인이 필요한 서비스예요!', 5);
              }
            }}
          >
            <img src={ClickedLike} alt="ClickedLike Icon" />
          </div>
        ) : (
          <div
            style={{
              position: 'absolute',
              zIndex: '1',
              cursor: 'pointer',
              bottom: '-10vh',
              left: '53vw',
            }}
            onClick={() => {
              if (accessToken) {
                setIsLikeClicked(!isLikeClicked);
                likeMutation.mutate(sskcookId);
              } else {
                message.warning('로그인이 필요한 서비스예요!', 5);
              }
            }}
          >
            <img src={Like} alt="Like Icon" />
          </div>
        )}
        <div>
          <Dropdown
            overlay={menu}
            open={isShareClicked}
            onOpenChange={(flag) => setIsShareClicked(flag)}
            trigger={['click']}
          >
            <div
              style={{
                position: 'absolute',
                zIndex: '1',
                cursor: 'pointer',
                bottom: '-17vh',
                left: '53vw',
              }}
            >
              <img
                src={isShareClicked ? ClickedShare : Share}
                alt={isShareClicked ? 'ClickedShare Icon' : 'Share Icon'}
              />
            </div>
          </Dropdown>
        </div>
        {isBookmarkClicked ? (
          <div
            style={{
              position: 'absolute',
              zIndex: '1',
              cursor: 'pointer',
              bottom: '-24vh',
              left: '53vw',
            }}
            onClick={() => {
              if (accessToken) {
                setIsBookmarkClicked(!isBookmarkClicked);
                storeMutation.mutate(sskcookId);
              } else {
                message.warning('로그인이 필요한 서비스예요!', 5);
              }
            }}
          >
            <img src={ClickedBookmark} alt="ClickedBookmark Icon" />
          </div>
        ) : (
          <div
            style={{
              position: 'absolute',
              zIndex: '1',
              cursor: 'pointer',
              bottom: '-24vh',
              left: '53vw',
            }}
            onClick={() => {
              if (accessToken) {
                setIsBookmarkClicked(!isBookmarkClicked);
                storeMutation.mutate(sskcookId);
              } else {
                message.warning('로그인이 필요한 서비스예요!', 5);
              }
            }}
          >
            <img src={Bookmark} alt="Bookmark Icon" />
          </div>
        )}
        {isPlaying ? (
          <div
            style={{
              position: 'absolute',
              zIndex: '1',
              cursor: 'pointer',
              top: '55vh',
              left: '30vw',
            }}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <img src={Pause} alt="Pause Icon" />
          </div>
        ) : (
          <div
            style={{
              position: 'absolute',
              zIndex: '1',
              cursor: 'pointer',
              top: '55vh',
              left: '30vw',
            }}
            onClick={() => {
              setIsPlaying(!isPlaying);
            }}
          >
            <img src={Play} alt="Play Icon" />
          </div>
        )}
        <SubscriptionContainer>
          <IngredientSection>
            <CustomImageButton
              src={sskcookDetailsData?.data?.details[0]?.profileImage}
              width={'3vw'}
              height={'3vw'}
              onClick={() =>
                handleChangeUrl(
                  `/subscription/${sskcookDetailsData?.data?.details[0]?.username}`,
                )
              }
            />
          </IngredientSection>
          <IngredientSection>
            <CustomText
              text={sskcookDetailsData?.data?.details[0]?.nickname}
              fontFamily={'Happiness-Sans-Regular'}
              fontSize={'.8vw'}
              color={COLORS.WHITE}
            />
          </IngredientSection>
          <IngredientSection>
            {isSubscriptionClicked ? (
              <CustomButton
                text={'구독중'}
                color={COLORS.BLACK}
                backgroundColor={COLORS.WHITE}
                borderColor={COLORS.BLACK}
                fontFamily={'Happiness-Sans-Bold'}
                borderRadius={'100px'}
                width={'4vw'}
                height={'4vh'}
                fontSize={'.8vw'}
                onClick={() => {
                  if (accessToken) {
                    setIsSubscriptionClicked(!isSubscriptionClicked);
                    subscriptionMutation.mutate({
                      followingUsername:
                        sskcookDetailsData?.data?.details[0]?.username,
                      followerUsername: member.username,
                    });
                  } else {
                    message.warning('로그인이 필요한 서비스예요!', 5);
                  }
                }}
              />
            ) : (
              <CustomButton
                text={'구독'}
                color={COLORS.WHITE}
                backgroundColor={COLORS.BLACK}
                borderColor={COLORS.WHITE}
                fontFamily={'Happiness-Sans-Bold'}
                borderRadius={'100px'}
                width={'4vw'}
                height={'4vh'}
                fontSize={'.8vw'}
                onClick={() => {
                  if (accessToken) {
                    setIsSubscriptionClicked(!isSubscriptionClicked);
                    subscriptionMutation.mutate({
                      followingUsername:
                        sskcookDetailsData?.data?.details[0]?.username,
                      followerUsername: member.username,
                    });
                  } else {
                    message.warning('로그인이 필요한 서비스예요!', 5);
                  }
                }}
              />
            )}
          </IngredientSection>
        </SubscriptionContainer>
        <WriteContainer>
          <CustomText
            text={sskcookDetailsData?.data?.details[0]?.title}
            color={COLORS.BLACK}
            fontFamily={'Happiness-Sans-Bold'}
            fontSize={'1.5vw'}
          />
          <TagContainer>
            {sskcookDetailsData?.data?.tags?.length > 0
              ? sskcookDetailsData?.data?.tags.map((item, index) => (
                  <TagInner key={index}>
                    <CustomText
                      text={'#'}
                      fontFamily={'Happiness-Sans-Regular'}
                      color={COLORS.BLACK}
                      fontSize={'1vw'}
                    />
                    <CustomText
                      text={item}
                      fontFamily={'Happiness-Sans-Regular'}
                      color={COLORS.BLACK}
                      fontSize={'1vw'}
                    />
                  </TagInner>
                ))
              : null}
          </TagContainer>
          <IngredientContainer>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2vw' }}>
              <CustomText
                text={'준비 재료'}
                color={COLORS.BLACK}
                fontFamily={'Happiness-Sans-Bold'}
                fontSize={'1.3vw'}
              />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CustomButton
                  text={'한번에 구매'}
                  color={COLORS.BLACK}
                  backgroundColor={COLORS.WHITE}
                  borderColor={COLORS.ORANGE}
                  fontFamily={'Happiness-Sans-Bold'}
                  width={'5vw'}
                  height={'4vh'}
                  fontSize={'.7vw'}
                  borderRadius={'100px'}
                  onClick={() => {
                    handleChangeUrl('/order');
                  }}
                  style={{ position: 'relative' }}
                />
                <img
                  src={LeftArrow}
                  alt=""
                  style={{ marginLeft: '-.5vw', cursor: 'pointer' }}
                  onClick={() => handleChangeUrl('/order')}
                />
              </div>
            </div>

            <IngredientInner>
              {sskcookDetailsData?.data?.ingredients.map((item, index) => (
                <IngredientWrapper key={index}>
                  <IngredientSection>
                    <CustomText
                      text={item.name}
                      fontFamily={'Happiness-Sans-Regular'}
                      color={COLORS.BLACK}
                      fontSize={'1vw'}
                    />
                  </IngredientSection>
                  <IngredientSection>
                    <CustomText
                      text={item.amount}
                      fontFamily={'Happiness-Sans-Regular'}
                      color={COLORS.BLACK}
                      fontSize={'1vw'}
                      style={{ textDecoration: 'underline' }}
                    />
                  </IngredientSection>
                  <IngredientSection>
                    <CustomButton
                      text={'구매'}
                      fontSize={'.7vw'}
                      borderRadius={'100px'}
                      color={COLORS.WHITE}
                      backgroundColor={COLORS.ORANGE}
                      borderColor={COLORS.ORANGE}
                      width={'3vw'}
                      height={'3vh'}
                      fontFamily={'Happiness-Sans-Bold'}
                      onClick={() => {
                        handleChangeUrl('/order');
                      }}
                    />
                  </IngredientSection>
                </IngredientWrapper>
              ))}
            </IngredientInner>
            <LineContainer />
          </IngredientContainer>
          <RecipeContainer>
            <CustomText
              text={'레시피'}
              color={COLORS.BLACK}
              fontFamily={'Happiness-Sans-Bold'}
              fontSize={'1.3vw'}
            />

            <IngredientContainer>
              <RecipeInner>
                <CustomText
                  text={sskcookDetailsData?.data?.details[0]?.recipe}
                  color={COLORS.BLACK}
                  fontFamily={'Happiness-Sans-Regular'}
                />
              </RecipeInner>
            </IngredientContainer>
          </RecipeContainer>
        </WriteContainer>
      </DetailsContainer>
    </>
  );
};

export default SskcookDetails;
