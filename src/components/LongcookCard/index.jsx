import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';
import { Container, Overlay } from './styles';
import TrashIcon from '../../assets/icons/trash_white.svg';
import CustomImageButton from '../Button/Image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { longcookAPI } from '../../apis/longcook';

const VideoPlayer = ({ type, url, id, color, isInMyInfo = false }) => {
  const [play, setPlay] = useState(false);
  const [hover, setHover] = useState(false);
  const playerRef = useRef(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (longcookId) => longcookAPI.longcookDeleteAPI(longcookId),
    onSuccess: () => {
      queryClient.invalidateQueries('longcook');
    },
    onError: (error) => {
      console.error('Failed to delete longcook:', error);
    },
  });

  const handleDeleteButtonClick = () => {
    console.log('delete loncook: ', id);
    mutation.mutate(id);
  };

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

  const handleClick = (event) => {
    event.stopPropagation();
    console.log('id: ', id);
    window.location.href = `/${type}/${id}`;
  };

  return (
    <Container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ backgroundColor: color }}
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
      />
      {isInMyInfo && hover && (
        <Overlay onClick={(event) => event.stopPropagation()}>
          <CustomImageButton
            src={TrashIcon}
            width="2vw"
            onClick={handleDeleteButtonClick}
          />
        </Overlay>
      )}
    </Container>
  );
};

export default VideoPlayer;
