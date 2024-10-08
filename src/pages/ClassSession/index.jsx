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
  ProfileWrapper,
  TitleWrapper,
} from './styles';
import { COLORS } from '../../constants';
import { useRecoilState } from 'recoil';
import { memberState } from '../../store';
import Modal from '../../components/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ProfileImage from '../../components/ProfileImage';

const OPENVIDU_SERVER_URL = process.env.REACT_APP_OPENVIDU_SERVER_URL;
const OPENVIDU_SERVER_SECRET = process.env.REACT_APP_OPENVIDU_SERVER_SECRET;

/**
 * 실시간 요리 클래스 (그룹)
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
const ClassSession = () => {
  const [member] = useRecoilState(memberState);
  const username = member.username;
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [publisher, setPublisher] = useState(null);
  const [OV, setOV] = useState(null);
  const [liveInfo, setLiveInfo] = useState(null);
  const [managerUsername, setManagerUsername] = useState(null);

  const [showExceedPeopleModal, setShowExceedPeopleModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  const queryClient = useQueryClient();

  const liveInfoQuery = useQuery({
    queryKey: ['liveInfo', sessionId],
    queryFn: () => liveAPI.getLiveInfoAPI(sessionId),
    staleTime: Infinity,
  });

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
    if (session && OV) {
      session.on('streamCreated', (event) => {
        let subscriber = session.subscribe(event.stream, undefined);
        console.log('new stream created: ', subscriber);
        setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
      });

      session.on('streamDestroyed', (event) => {
        const remainingSubscribers = subscribers.filter(
          (sub) =>
            sub.stream.connection.connectionId !==
            event.stream.connection.connectionId,
        );
        setSubscribers(remainingSubscribers);

        console.log('subscriber`s stream destroyed: ', event.stream.connection);
        if (event.stream.connection.data === managerUsername) {
          console.log('stream destroyed: ', event.stream.connection);
          handleManagerStreamDisconnected();
        }
      });

      getToken(sessionId).then((token) => {
        session
          .connect(token)
          .then(() => {
            let publisher = OV.initPublisher(undefined);
            setPublisher(publisher);
            session.publish(publisher);

            session.streams.forEach((stream) => {
              let subscriber = session.subscribe(stream, undefined);
              setSubscribers((prevSubscribers) => [
                ...prevSubscribers,
                subscriber,
              ]);
            });
          })
          .catch((error) => {
            console.log(
              'Error connecting to the session:',
              error.code,
              error.message,
            );
          });
      });
    }
  }, [session, OV, sessionId]);

  const handleManagerStreamDisconnected = () => {
    openExitModal();
    endSession();
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
    mutation.mutate(liveInfo.liveId);
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
    setSubscribers([]);
    setPublisher(null);
    setManagerUsername(null);

    window.location.href = '/live';
  }, [session]);

  const initSession = () => {
    let OV = new OpenVidu();
    setOV(OV);

    const newSession = OV.initSession();
    setSession(newSession);
  };

  const openExitModal = () => {
    setShowExitModal(true);
  };

  const closeExitModal = () => {
    setShowExitModal(false);
  };

  const getToken = (sessionId) => {
    return createSession(sessionId).then((sessionId) => createToken(sessionId));
  };

  const createSession = (sessionId) => {
    return axios
      .post(
        `${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
        { customSessionId: sessionId },
        {
          headers: {
            Authorization:
              'Basic ' + btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`),
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => response.data.id)
      .catch((error) => {
        console.error('Error creating session:', error);
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
            Authorization:
              'Basic ' + btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`),
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => response.data.token)
      .catch((error) => {
        console.error('Error creating token:', error);
        throw new Error(error);
      });
  };

  return (
    <Container>
      <PageTitleContainer>
        <TitleWrapper>
          <CustomText
            text="온라인 클래스"
            fontFamily="Happiness-Sans-Bold"
            fontSize="1.4rem"
            color={COLORS.BLACK}
          />
          <CustomText
            text={'/'}
            fontFamily="Happiness-Sans-Bold"
            fontSize="1.2rem"
            color={COLORS.BLACK}
          />
          <CustomText
            text={`${liveInfo?.title}`}
            fontFamily="Happiness-Sans-Bold"
            fontSize="1.2rem"
            color={COLORS.BLACK}
          />
        </TitleWrapper>
        <CustomButton
          text={'나가기'}
          color={COLORS.WHITE}
          width="4vw"
          height="3vh"
          fontSize=".8rem"
          borderRadius={'20px'}
          fontFamily={'Happiness-Sans-Bold'}
          backgroundColor={COLORS.ORANGE}
          borderColor={COLORS.ORANGE}
          onClick={(e) => {
            e.preventDefault();
            leaveSession();
          }}
        ></CustomButton>
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
        </ClassInfoContainer>
      )}
      {session && (
        <Session
          sessionId={sessionId}
          leaveSession={leaveSession}
          participants={
            publisher ? [publisher, ...subscribers] : [...subscribers]
          }
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

export default ClassSession;
