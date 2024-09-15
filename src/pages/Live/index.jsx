import React, { useState, useEffect } from 'react';
import {
  Container,
  ContentContainer,
  CreateButtonWrapper,
  LiveContainer,
  LiveListContainer,
  LiveThumbnailImage,
  LiveTitleContainer,
  LiveTitleWrapper,
  PageTitleContainer,
  ParticipantImage,
  SearchContainer,
} from './styles';
import CustomText from '../../components/Text';
import { COLORS } from '../../constants';
import { useInfiniteQuery } from '@tanstack/react-query';
import instance from '../../apis';
import { useCustomNavigate } from '../../hooks';
import axios from 'axios';
import Modal from '../../components/Modal';
import CustomButton from '../../components/Button';
import icon_person from '../../assets/icons/icon_person.svg';
import { Tooltip } from 'antd';
import { CustomSearchInput } from '../../components/Input';

const OPENVIDU_SERVER_URL = process.env.REACT_APP_OPENVIDU_SERVER_URL;
const OPENVIDU_SERVER_SECRET = process.env.REACT_APP_OPENVIDU_SERVER_SECRET;

const Live = () => {
  const [searchValue, setSearchValue] = useState('');
  const { handleChangeUrl } = useCustomNavigate();
  const [liveList, setLiveList] = useState([]);
  const [keyword, setKeyword] = useState(null);
  const [showExceedAlertModal, setShowExceedAlertModal] = useState(false);

  const {
    data: fetchedLiveList,
    fetchNextPage: fetchLiveNextPage,
    hasNextPage: hasLiveNextPage,
    isFetchingNextPage: isLiveFetching,
  } = useInfiniteQuery({
    queryKey: ['userLiveList', keyword],
    queryFn: ({ pageParam = 1 }) =>
      instance
        .get(
          keyword
            ? `/live/?page=${pageParam}&keyword=${keyword}`
            : `/live/?page=${pageParam}`,
        )
        .then((res) => {
          console.log('res: ', res.data);
          return res.data;
        }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const documentHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    if (windowHeight + scrollTop >= documentHeight - 100) {
      if (hasLiveNextPage && !isLiveFetching) {
        fetchLiveNextPage();
      }
    }
  };

  const participantsNum = async (sessionId) => {
    try {
      const res = await getSessionInfo(sessionId);
      console.log('sessionId: ', sessionId, res.connections.numberOfElements);
      return res.connections.numberOfElements;
    } catch (error) {
      console.error('Error checking session capacity:', error);
      return false;
    }
  };

  const getSessionInfo = (sessionId) => {
    return axios
      .get(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}`, {
        headers: {
          Authorization:
            'Basic ' + btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`),
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error getting session info:', error);
        if (error?.response?.status === 404) {
          return { connections: { numberOfElements: 0 } };
        } else {
          alert('No connection to OpenVidu Server.');
          window.location.assign(`${OPENVIDU_SERVER_URL}/accept-certificate`);
        }
      });
  };

  const handleClickLiveItem = async (id, type, people) => {
    // 클래스 타입이면 인원 체크
    if (type === 0) {
      const num = await participantsNum(id);
      if (num >= people) {
        openExceedAlertModal();
        return;
      }
      handleChangeUrl(`/live/class/${id}`);
      return;
    }

    handleChangeUrl(`/live/${id}`);
  };

  useEffect(() => {
    if (fetchedLiveList) {
      setLiveList(fetchedLiveList.pages.flatMap((page) => page.data));
    }
  }, [fetchedLiveList]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchLiveNextPage, hasLiveNextPage, isLiveFetching]);

  const openExceedAlertModal = () => {
    setShowExceedAlertModal(true);
  };

  const closeExceedAlertModal = () => {
    setShowExceedAlertModal(false);
  };

  const handleClickCreateButton = () => {
    handleChangeUrl('/live/create');
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setKeyword(searchValue);
    }
  };

  return (
    <Container>
      <PageTitleContainer>
        <CustomText
          text={'진행 중인 실시간 클래스'}
          fontFamily={'Happiness-Sans-Bold'}
          fontSize={'1.5rem'}
          color={COLORS.BLACK}
        />
      </PageTitleContainer>
      <SearchContainer>
        <CustomSearchInput
          text={'라이브 검색'}
          fontSize={'1rem'}
          width={'20vw'}
          height={'4vh'}
          type={'text'}
          onChange={handleChange}
          value={searchValue}
          onKeyDown={handleKeyDown}
        />
        <CustomButton
          text={'라이브 열기'}
          color={COLORS.WHITE}
          width={'6vw'}
          height={'4vh'}
          backgroundColor={COLORS.ORANGE}
          borderColor={COLORS.ORANGE}
          fontSize={'.9rem'}
          onClick={handleClickCreateButton}
          fontFamily={'Happiness-Sans-Bold'}
          borderRadius={'20px'}
        />
      </SearchContainer>
      <ContentContainer>
        {liveList.length === 0 && (
          <CustomText
            text={'열린 클래스가 없어요!'}
            fontFamily={'Happiness-Sans-Bold'}
            fontSize={'1rem'}
            color={COLORS.ORANGE}
          />
        )}
        <LiveListContainer>
          {0 < liveList.length &&
            liveList.map((live, index) => (
              <LiveContainer>
                <LiveThumbnailImage
                  src={live.thumbnail}
                  onClick={() => {
                    handleClickLiveItem(live.sessionId, live.type, live.people);
                  }}
                />
                <LiveTitleContainer>
                  <CustomText
                    text={live.title}
                    fontFamily={'Happiness-Sans-Bold'}
                    fontSize={'1rem'}
                    color={COLORS.BLACK}
                    onClick={() => {
                      handleClickLiveItem(
                        live.sessionId,
                        live.type,
                        live.people,
                      );
                    }}
                  />
                  {live.type === 0 && (
                    <Tooltip
                      color={COLORS.ORANGE}
                      title={`최대 수강 인원은 ${live.people}명 입니다.`}
                    >
                      <LiveTitleWrapper>
                        <ParticipantImage src={icon_person} />
                        <CustomText
                          text={live.people}
                          fontFamily={'Happiness-Sans-Bold'}
                          fontSize={'1rem'}
                          color={COLORS.BLACK}
                        />
                      </LiveTitleWrapper>
                    </Tooltip>
                  )}
                </LiveTitleContainer>
              </LiveContainer>
            ))}
        </LiveListContainer>
      </ContentContainer>
      <Modal
        show={showExceedAlertModal}
        onClose={closeExceedAlertModal}
        title={'입장 불가'}
        content={'수강 인원이 다 찼습니다.'}
      ></Modal>
    </Container>
  );
};

export default Live;
