import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';
import { Container, Overlay } from './styles';
import CustomImageButton from '../Button/Image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TrashIcon from '../../assets/icons/trash_white.svg';

const VideoPlayer = ({
  type,
  url,
  id,
  color,
  isInMyInfo = false,
  deleteAPI,
  queryKey,
  height,
  width,
}) => {
import { useNavigate } from 'react-router-dom';
const VideoPlayer = ({
  type,
  url,
  id,
  color,
  isInMyInfo = false,
  deleteAPI,
  queryKey,
  height,
  status,
  page,
}) => {
  const [play, setPlay] = useState(false);
  const [hover, setHover] = useState(false);
  const playerRef = useRef(null);
  const navigate = useNavigate();
  const [transformedPage, setTransformedPage] = useState(page);
  useEffect(() => {
    setTransformedPage(Math.floor(page / 10) + 1);
  }, [page]);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => deleteAPI(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
    onError: (error) => {
      console.error(`Failed to delete ${type}:`, error);
    },
  });

  const handleDeleteButtonClick = (event) => {
    event.stopPropagation();
    console.log(`delete ${type}: `, id);
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
    // window.location.href = `/${type}/${id}`;
    navigate(`/${type}/${id}`, { state: { key: { status, transformedPage } } });
  };

  return (
    <Container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      height={height}
      width={width}
      style={{ backgroundColor: color, position: 'relative' }}
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
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          zIndex: 1,
          cursor: 'pointer',
        }}
        onClick={handleClick}
      />
      {isInMyInfo && hover && (
        <Overlay onClick={(event) => event.stopPropagation()}>
          <CustomImageButton
            src={TrashIcon}
            width="2vw"
            onClick={handleDeleteButtonClick}
            zIndex="3"
          />
        </Overlay>
      )}
    </Container>
  );
};

export default VideoPlayer;
