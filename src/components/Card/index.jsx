import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';
import {
  Container,
  StyledSskcookSkeleton,
  StyledLongcookSkeleton,
} from './styles';

const VideoPlayer = ({ url, isSskcook }) => {
  const [play, setPlay] = useState(false);
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const playerRef = useRef(null);

  const handleMouseEnter = () => {
    setHover(true);
    setPlay(true);
    setTimeout(() => {
      setPlay(false);
      setHover(false);
    }, 3000);
  };

  const handleMouseLeave = () => {
    setPlay(false);
    setHover(false);
  };

  const handleClick = () => {
    setPlay(false);
  };

  const handleCanPlay = () => {
    setLoading(true);
  };

  return (
    <Container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <ReactPlayer
        style={{ cursor: 'pointer' }}
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        playing={play}
        muted={true}
        controls={false}
        onReady={handleCanPlay}
      />
    </Container>
  );
};

export default VideoPlayer;
