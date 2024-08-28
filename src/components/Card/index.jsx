import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';
import { Container } from './styles';
import { useCustomNavigate } from '../../hooks';

const VideoPlayer = ({ url, sskcookId, color }) => {
  const [play, setPlay] = useState(false);
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const playerRef = useRef(null);
  const { handleChangeUrl } = useCustomNavigate();

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
    handleChangeUrl(`/sskcook/${sskcookId}`);
  };

  return (
    <Container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ backgroundColor: `${color}` }}
    >
      {
        <ReactPlayer
          style={{ cursor: 'pointer' }}
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          playing={play}
          muted={true}
          controls={false}
        />
      }
    </Container>
  );
};

export default VideoPlayer;
