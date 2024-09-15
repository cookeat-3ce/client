import styled from 'styled-components';
import { COLORS } from '../../constants';

const live_frame = require('../../assets/images/live_frame.svg').default;

export const Container = styled.div`
  width: 72vw;
  display: flex;
  flex-direction: column;
  // border: 10px solid ${COLORS.BLACK};
`;

export const ManagerVideoContainer = styled.div`
  width: 72vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${live_frame});
  background-size: cover;
  background-position: center;
`;

export const ManagerVideoWrapper = styled.div`
  position: relative;
  width: 90%;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  background-color: ${COLORS.ORANGE};
  overflow: hidden;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two columns */
  gap: 10px;
  margin: 10px;
  // border: 10px solid ${COLORS.GREEN};

  /* Responsive design for smaller screens */
  @media (max-width: 600px) {
    grid-template-columns: 1fr; /* Stack in a single column on smaller screens */
  }
`;

export const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  background-color: ${COLORS.GREEN};
  overflow: hidden;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  h3 {
    position: absolute;
    top: 5px;
    left: 5px;
    color: ${COLORS.WHITE};
    z-index: 2;
  }
`;
