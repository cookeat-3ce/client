import React, { useRef, useEffect } from 'react';
import { StyledVideo } from './styles';

/**
 * WebRTC로 전송(수신)되는 스트림 정보 (비디오)
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
