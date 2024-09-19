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
