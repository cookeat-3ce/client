import React from 'react';
import OpenViduVideo from '../OpenViduVideo';
import {
  Container,
  MainVideoContainer,
  ManagerVideoContainer,
  ManagerVideoWrapper,
  VideoGrid,
  VideoWrapper,
} from './styles';

/**
 * 현재 세션에 연결된 비디오 스트림 출력
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
const Session = ({ participants, managerUsername }) => {
  return (
    <Container>
      {participants &&
        participants.map((participant, index) => {
          if (participant.stream.connection.data === managerUsername) {
            return (
              <MainVideoContainer>
                <ManagerVideoContainer>
                  <ManagerVideoWrapper key={index}>
                    <OpenViduVideo streamManager={participant} />
                  </ManagerVideoWrapper>
                </ManagerVideoContainer>
              </MainVideoContainer>
            );
          }
          return null;
        })}

      <VideoGrid>
        {participants &&
          participants.map((participant, index) => {
            if (participant.stream.connection.data !== managerUsername) {
              return (
                <VideoWrapper key={index}>
                  <OpenViduVideo streamManager={participant} />
                </VideoWrapper>
              );
            }
            return null;
          })}
      </VideoGrid>
    </Container>
  );
};

export default Session;
