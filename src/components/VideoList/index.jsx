import React, { useEffect, useState } from 'react';
import { Container, SskcookContainer, LongcookContainer } from './styles';
import VideoPlayer from '../Card';
import { COLORS } from '../../constants';

const CustomVideoList = ({ type, videos }) => {
  const [currentVideos, setCurrentVideos] = useState([]);

  useEffect(() => {
    if (!videos) return;
    console.log('videos at custom list: ', videos.length);
    setCurrentVideos(videos);
  }, [videos]);

  return (
    <Container>
      {type === 'sskcook' && (
        <SskcookContainer>
          {currentVideos &&
            currentVideos.map((video, index) => (
              <VideoPlayer
                key={index}
                type={'sskcook'}
                url={video.sskcookUrl}
                sskcookId={video.sskcookId}
                color={COLORS.BLACK}
              />
            ))}
        </SskcookContainer>
      )}
      {type === 'longcook' && (
        <LongcookContainer>
          {currentVideos &&
            currentVideos.map((video, index) => (
              <VideoPlayer
                key={index}
                type={'longcook'}
                url={video.longcookUrl}
                id={video.longcookId}
                color={COLORS.BLACK}
              />
            ))}
        </LongcookContainer>
      )}
    </Container>
  );
};

export default CustomVideoList;
