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

const CustomVideoList = ({ type, videos, isInMyInfo = false }) => {
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
              <CardWrapper>
                <Card
                  key={index}
                  type={'sskcook'}
                  url={video.sskcookUrl}
                  id={video.sskcookId}
                  color={COLORS.BLACK}
                  isInMyInfo={isInMyInfo}
                  deleteAPI={sskcookAPI.sskcookDeleteAPI}
                  queryKey="sskcooks"
                />
                <ProfileCard index={video} profile={false} />
              </CardWrapper>
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
