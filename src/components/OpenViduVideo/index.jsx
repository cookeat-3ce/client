import React, { useRef, useEffect } from 'react';
import { StyledVideo } from './styles';

const OpenViduVideo = ({ streamManager }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <StyledVideo autoPlay ref={videoRef} />;
};

export default OpenViduVideo;
