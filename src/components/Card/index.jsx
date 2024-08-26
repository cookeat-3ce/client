import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';
import { Container } from './styles';

const VideoPlayer = ({ url, width, height }) => {
  const [play, setPlay] = useState(false);
  const [hover, setHover] = useState(false);
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

  return (
    <Container
      width={width}
      height={height}
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
        controls={false}
      />
    </Container>
  );
};

export default VideoPlayer;
