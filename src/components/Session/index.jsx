import React from 'react';
import OpenViduVideo from '../OpenViduVideo';
import {
  Container,
  ManagerVideoContainer,
  ManagerVideoWrapper,
  VideoGrid,
  VideoWrapper,
} from './styles';

const Session = ({
  sessionId,
  leaveSession,
  participants,
  managerUsername,
}) => {
  return (
    <Container>
      {participants &&
        participants.map((participant, index) => {
          if (participant.stream.connection.data === managerUsername) {
            return (
              <ManagerVideoContainer>
                <ManagerVideoWrapper key={index}>
                  <OpenViduVideo streamManager={participant} />
                </ManagerVideoWrapper>
              </ManagerVideoContainer>
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
