import React, { useState, useEffect, useCallback } from 'react';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import Session from '../../components/Session';
import { useParams } from 'react-router-dom';
import { liveAPI } from '../../apis/live';
import { useQuery } from '@tanstack/react-query';
import CustomText from '../../components/Text';
import CustomButton from '../../components/Button';
import {
  ClassInfoContainer,
  Container,
  PageTitleContainer,
  ParticipantCount,
  ParticipantImage,
  ProfileWrapper,
  TitleWrapper,
} from './styles';
import { COLORS } from '../../constants';
import { useRecoilState } from 'recoil';
import { memberState } from '../../store';
import Modal from '../../components/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ProfileImage from '../../components/ProfileImage';
import icon_person from '../../assets/icons/icon_person.svg';
import { Tooltip } from 'antd';

const OPENVIDU_SERVER_URL = process.env.REACT_APP_OPENVIDU_SERVER_URL;
const OPENVIDU_SERVER_SECRET = process.env.REACT_APP_OPENVIDU_SERVER_SECRET;

/**
 * 실시간 요리 라이브 (1인 스트리밍)
 *
 * @author 김지수
 * @version 1.0
 * @since 2024.09.05
 *
 *
 * <pre>
 * 수정일          수정자         내용
 * ------------- ----------- ---------------------------------
 * 2024.09.05    김지수       최초 생성
 * </pre>
 */
const LiveSession = () => {
  const [member] = useRecoilState(memberState);
  const username = member.username;
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [OV, setOV] = useState(null);
  const [liveInfo, setLiveInfo] = useState(null);
  const [managerUsername, setManagerUsername] = useState(null);
  const [managerStream, setManagerStream] = useState(null);
  const [participantsCount, setParticipantsCount] = useState(0);

  const [showExitModal, setShowExitModal] = useState(false);

  const queryClient = useQueryClient();

  const liveInfoQuery = useQuery({
    queryKey: ['liveInfo', sessionId],
    queryFn: () => liveAPI.getLiveInfoAPI(sessionId),
    staleTime: Infinity,
  });

  const openExitModal = () => {
    setShowExitModal(true);
  };

  const closeExitModal = () => {
    setShowExitModal(false);
  };

  useEffect(() => {
    if (liveInfoQuery.data) {
      const info = liveInfoQuery.data.data;
      setManagerUsername(info.username);
      setLiveInfo(info);
    }
  }, [liveInfoQuery.data]);

  useEffect(() => {
    if (liveInfo) {
      initSession();
    }
  }, [liveInfo]);

  useEffect(() => {
    let interval;

    if (session) {
      interval = setInterval(() => {
        getSessionInfo().then((res) => {
          if (res && res.connections) {
            setParticipantsCount(res.connections.numberOfElements);
          }
        });
      }, 5000); // 5초마다 호출
    }

    return () => {
      clearInterval(interval);
    };
  }, [session]);

  const initSession = () => {
    const OVInstance = new OpenVidu();
    setOV(OVInstance);

    const newSession = OVInstance.initSession();
    setSession(newSession);

    newSession.on('streamCreated', (event) => {
      const newStream = event.stream;

      if (newStream.connection.data === `${managerUsername}`) {
        console.log('subscriber: ', managerUsername);
        const subscriber = newSession.subscribe(newStream, undefined);
        setManagerStream(subscriber);
      }
    });

    newSession.on('streamDestroyed', (event) => {
      console.log('stream destroyed: ', event.stream.connection);
      if (event.stream.connection.data === managerUsername) {
        handleManagerStreamDisconnected();
      }
    });

    getToken(sessionId).then((token) => {
      newSession
        .connect(token)
        .then(() => {
          if (username === managerUsername) {
            const publisher = OVInstance.initPublisher(undefined);
            setManagerStream(publisher);
            newSession.publish(publisher);
          }
        })
        .catch((error) => {
          console.error('Error connecting to the session:', error.message);
        });
    });
  };

  const mutation = useMutation({
    mutationFn: (liveId) => liveAPI.endLiveAPI(liveId),
    onSuccess: () => {
      queryClient.invalidateQueries('live');
    },
    onError: (error) => {
      console.error('Failed to end live:', error);
    },
  });

  const endSession = async () => {
    console.log('end session: ', liveInfo.liveId);
    mutation.mutate(liveInfo.liveId);
  };

  const handleManagerStreamDisconnected = () => {
    openExitModal();
    endSession();
  };

  const leaveSession = useCallback(async () => {
    if (session) {
      if (username === managerUsername) {
        await endSession();
      }
      session.disconnect();
    }

    setOV(null);
    setSession(null);
    setManagerStream(null);
    setParticipantsCount(0);

    window.location.href = '/live';
  }, [session, endSession, username, managerUsername]);

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);

    return () => {
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, [leaveSession]);

  const getToken = (sessionId) => {
    return createSession(sessionId).then(createToken);
  };

  const getSessionInfo = () => {
    return axios
      .get(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}`, {
        headers: {
          Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error getting session info:', error);
        if (error?.response?.status === 404) {
          return null;
        } else {
          alert('No connection to OpenVidu Server.');
          window.location.assign(`${OPENVIDU_SERVER_URL}/accept-certificate`);
        }
      });
  };

  const createSession = (sessionId) => {
    return axios
      .post(
        `${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
        { customSessionId: sessionId },
        {
          headers: {
            Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => response.data.id)
      .catch((error) => {
        if (error?.response?.status === 409) {
          return sessionId;
        } else {
          alert('No connection to OpenVidu Server.');
          window.location.assign(`${OPENVIDU_SERVER_URL}/accept-certificate`);
        }
      });
  };

  const createToken = (sessionId) => {
    return axios
      .post(
        `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
        { data: username },
        {
          headers: {
            Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => response.data.token)
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <Container>
      <PageTitleContainer>
        <TitleWrapper>
          <CustomText
            text="요라"
            fontFamily="Happiness-Sans-Regular"
            fontSize="1rem"
            color={COLORS.GRAY}
          />
          <CustomText
            text={'/'}
            fontFamily="Happiness-Sans-Regular"
            fontSize="1rem"
            color={COLORS.GRAY}
          />
          <CustomText
            text={`${liveInfo?.title}`}
            fontFamily="Happiness-Sans-Bold"
            fontSize="1.5rem"
            color={COLORS.BLACK}
          />
          <ParticipantCount>
            <Tooltip title={'현재 동시 접속자 수'} color={COLORS.ORANGE}>
              <ParticipantImage src={icon_person} />
            </Tooltip>
            <CustomText
              text={`${participantsCount}`}
              fontFamily="Happiness-Sans-Bold"
              fontSize="1rem"
              color={COLORS.BLACK}
            />
          </ParticipantCount>
        </TitleWrapper>
      </PageTitleContainer>
      {liveInfo && (
        <ClassInfoContainer>
          <ProfileWrapper>
            <ProfileImage
              src={liveInfo.profileImage}
              width={'6vh'}
              borderRadius={'50px'}
            />
            <CustomText
              text={`${liveInfo.nickname}`}
              fontFamily="Happiness-Sans-Bold"
              fontSize="1rem"
              color={COLORS.BLACK}
            />
          </ProfileWrapper>
          <CustomButton
            text="나가기"
            color={COLORS.WHITE}
            width="4vw"
            height="4vh"
            fontSize="1rem"
            borderRadius="20px"
            fontFamily="Happiness-Sans-Bold"
            backgroundColor={COLORS.ORANGE}
            borderColor={COLORS.ORANGE}
            onClick={(e) => {
              e.preventDefault();
              leaveSession();
            }}
          />
        </ClassInfoContainer>
      )}
      {managerStream && (
        <Session
          sessionId={sessionId}
          leaveSession={leaveSession}
          participants={[managerStream]}
          managerUsername={managerUsername}
        />
      )}
      <Modal
        show={showExitModal}
        title={'라이브 종료'}
        content={'라이브 스트림이 끊어졌습니다. 방을 나갑니다.'}
        onClose={closeExitModal}
        onSubmit={leaveSession}
      />
    </Container>
  );
};

export default LiveSession;
