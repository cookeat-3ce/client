import React, { useEffect, useState } from 'react';
import {
  Container,
  SskcookContainer,
  LongcookContainer,
  CardWrapper,
} from './styles';
import Card from '../Card';
import ProfileCard from '../ProfileCard';
import { COLORS } from '../../constants';
import { sskcookAPI } from '../../apis/sskcook';
import { longcookAPI } from '../../apis/longcook';
import VideoPlayer from '../Card';

const CustomVideoList = ({
  type,
  videos,
  isInMyInfo = false,
  status,
  width,
  height,
}) => {
  const [currentVideos, setCurrentVideos] = useState([]);
  useEffect(() => {
    if (!videos) return;
    console.log('videos at custom list: ', videos.length);
    setCurrentVideos(videos);
  }, [videos]);
  const handleItemClick = (itemId) => {
    const index = videos.findIndex((item) => item.sskcookId === itemId);
    return index;
  };
  return (
    <Container>
      {type === 'sskcook' && (
        <SskcookContainer width={width} height={height}>
          {currentVideos &&
            currentVideos.map((video, index) => (
              <VideoPlayer
                key={index}
                type={'sskcook'}
                url={video.sskcookUrl}
                id={video.sskcookId}
                color={COLORS.BLACK}
                isInMyInfo={isInMyInfo}
                deleteAPI={sskcookAPI.sskcookDeleteAPI}
                queryKey="sskcooks"
                status={status}
                page={handleItemClick(video.sskcookId)}
                width={width}
                height={height}
              />
            ))}
        </SskcookContainer>
      )}
      {type === 'longcook' && (
        <LongcookContainer>
          {currentVideos &&
            currentVideos.map((video, index) => (
              <CardWrapper>
                <Card
                  key={index}
                  type={'longcook'}
                  url={video.longcookUrl}
                  id={video.longcookId}
                  color={COLORS.BLACK}
                  isInMyInfo={isInMyInfo}
                  deleteAPI={longcookAPI.longcookDeleteAPI}
                  queryKey="longcook"
                />
                <ProfileCard index={video} profile={false} />
              </CardWrapper>
            ))}
        </LongcookContainer>
      )}
    </Container>
  );
};

export default CustomVideoList;
