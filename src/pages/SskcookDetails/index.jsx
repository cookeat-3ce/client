import React, { useState, useRef, useEffect, useCallback } from 'react';
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
import SalesIcon from '../../assets/icons/sale.svg';

const SskcookDetails = () => {
  const sskcookId = window.location.pathname.split('/').pop();
  const [member, setMember] = useRecoilState(memberState);
  const [isSirenClicked, setIsSirenClicked] = useState(false);
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [isShareClicked, setIsShareClicked] = useState(false);
  const [isBookmarkClicked, setIsBookmarkClicked] = useState(false);
  const [isSubscriptionClicked, setIsSubscriptionClicked] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const { Kakao } = window;
  const playerRef = useRef(null);
  const { handleChangeUrl } = useCustomNavigate();

  const { transcript } = useSpeechRecognition();

  const [isPlaying, setIsPlaying] = useState(true);
  const word = transcript.split(' ');

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init(process.env.REACT_APP_KAKAO_INIT_KEY);
  }, []);

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

  const handleArrayClick = useCallback(() => {
    if (sskcookDetailsData && sskcookDetailsData.data.ingredients) {
      const newIngredientNames = sskcookDetailsData.data.ingredients.map(
        (item) => item.name,
      );

      setOrderList(newIngredientNames);

      const encodedData = encodeURIComponent(
        JSON.stringify(newIngredientNames),
      );

      window.open(
        `http://localhost:3000/order?data=${encodedData}`,
        '_blank',
        'noopener,noreferrer',
      );
    }
  }, [sskcookDetailsData, setOrderList]);

  const handleItemClick = (item) => {
    const encodedItem = encodeURIComponent(item);
    window.open(
      `http://localhost:3000/order?data=${encodedItem}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

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
      .then(() => message.success('주소 복사 성공!', 5))
      .catch((err) => message.error('주소 복사 실패!', 5));
  };

  const shareKakao = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${sskcookDetailsData.data.details[0].title}`,
        description: `${sskcookDetailsData.data.details[0].recipe}`,
        imageUrl: 'https://ifh.cc/g/lzPj16.png',
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      itemContent: {
        profileText: `${sskcookDetailsData.data.details[0].nickname}`,
      },
      social: {
        likeCount: Number(sskcookDetailsData.data.details[0].likeCount),
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
            url={sskcookDetailsData?.data.details[0]?.sskcookUrl}
            width="100%"
            height="100%"
            muted={false}
            controls={false}
            playing={isPlaying}
            loop={true}
            ref={playerRef}
          />
        </VideoContainer>
        {member.nickname !== sskcookDetailsData?.data.details[0]?.nickname && (
          <div
            style={{
              position: 'absolute',
              zIndex: '1',
              cursor: 'pointer',
              left: '53vw',
              top: '20vh',
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
            <img
              src={isSirenClicked ? ClickedSiren : Siren}
              alt={isSirenClicked ? 'ClickedSiren Icon' : 'Siren Icon'}
            />
          </div>
        )}

        {isLikeClicked ? (
          <div
            style={{
              position: 'absolute',
              zIndex: '1',
              cursor: 'pointer',
              bottom: '11vw',
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
              bottom: '11vw',
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
                bottom: '8vw',
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
              bottom: '5vw',
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
              bottom: '5vw',
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
              top: '20vh',
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
              top: '20vh',
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
              src={sskcookDetailsData.data.details[0].profileImage}
              width={'3vw'}
              height={'3vw'}
              onClick={() =>
                handleChangeUrl(
                  `/subscription/${sskcookDetailsData.data.details[0].username}`,
                )
              }
            />
          </IngredientSection>
          <IngredientSection>
            <CustomText
              text={sskcookDetailsData.data.details[0].nickname}
              fontFamily={'Happiness-Sans-Regular'}
              fontSize={'.8vw'}
              color={COLORS.WHITE}
            />
          </IngredientSection>
          <IngredientSection>
            {member.nickname !==
              sskcookDetailsData?.data?.details[0]?.nickname && (
              <CustomButton
                text={isSubscriptionClicked ? '구독중' : '구독'}
                color={isSubscriptionClicked ? COLORS.BLACK : COLORS.WHITE}
                backgroundColor={
                  isSubscriptionClicked ? COLORS.WHITE : COLORS.BLACK
                }
                borderColor={
                  isSubscriptionClicked ? COLORS.BLACK : COLORS.WHITE
                }
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
                        sskcookDetailsData.data.details[0].username,
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <img src={SalesIcon} alt="Sales Icon" />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CustomButton
                    text={'한번에 구매'}
                    color={COLORS.ORANGE}
                    backgroundColor={COLORS.WHITE}
                    borderColor={COLORS.ORANGE}
                    fontFamily={'Happiness-Sans-Bold'}
                    width={'5vw'}
                    height={'4vh'}
                    fontSize={'.7vw'}
                    borderRadius={'100px'}
                    onClick={handleArrayClick}
                    style={{ position: 'relative' }}
                  />
                  <img
                    src={LeftArrow}
                    alt=""
                    style={{ marginLeft: '-.5vw', cursor: 'pointer' }}
                    onClick={handleArrayClick}
                  />
                </div>
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
                      onClick={() => handleItemClick(item.name)}
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
