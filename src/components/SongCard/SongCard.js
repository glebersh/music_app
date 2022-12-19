import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import './SongCard.css';

import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong, setIsPlaying, setPreviousSong, setSongsCollectionType } from '../../store/slices/playerSlice';

const SongCard = (props) => {

  const link = `artists/${props.album.artists[0].id}`;

  const isPlaying = useSelector(state => state.playerReducer.isPlaying);
  const currentSong = useSelector(state => state.playerReducer.currentSong);
  const isLoading = useSelector(state => state.searchReducer.isLoading);

  const dispatch = useDispatch();

  const millisToMinutesAndSeconds = (milliseconds) => {
    let minutes = Math.floor(milliseconds / 60000);
    let seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return (
      seconds == 60 ?
        (minutes + 1) + ":00" :
        minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    );
  };

  const onPlayHandler = (playbleLink) => {
    if (playbleLink !== currentSong?.preview_url && isPlaying) {
      dispatch(setPreviousSong(currentSong));
      dispatch(setCurrentSong(props));
      dispatch(setSongsCollectionType('songs'));
    }
    else if (playbleLink !== currentSong?.preview_url && !isPlaying) {
      dispatch(setPreviousSong(currentSong));
      dispatch(setCurrentSong(props));
      dispatch(setSongsCollectionType('songs'));
      dispatch(setIsPlaying());
    }
    else if (playbleLink === currentSong?.preview_url) {
      dispatch(setIsPlaying());
    }
  };

  return (
    <div data-testid='song-container'>
      {!isLoading &&
        (<Flex m='0 0 2em 0' align='center'
          justify='space-between' direction='row'>
          <Flex>

            <Image src={props?.album?.images[0]?.url} fallbackSrc='https://via.placeholder.com/64' maxW='64px' maxH='64px' loading="lazy" />

            <Flex direction='column' ml='1em'>
              <Box>
                <Text w='100%' fontWeight='700' display='inline' mr='1em'>{props?.name}</Text>
                <span>{props.explicit && <i className="bi bi-explicit"></i>}</span>
              </Box>
              <Text minW='100%'>{props?.album?.name}</Text>
              <Link to={link}><Text _hover={{
                cursor: 'pointer',
                color: 'primary'
              }}>{props?.artists[0]?.name}</Text></Link>
            </Flex>
          </Flex >

          <Flex direction='column' mr='3em'>
            <Text ml='auto' color='lightgray'>{millisToMinutesAndSeconds(props?.duration_ms)}</Text>
            {props.preview_url === null ? null : isPlaying &&
              currentSong?.id === props.id ?
              <i className='bi bi-pause song-card-icon'
                id={props.id} role='play-button' data-testid='pause-icon'
                onClick={() => onPlayHandler(props.preview_url)}
              /> : <i className='bi bi-play-fill song-card-icon'
                id={props.id} role='play-button' data-testid='play-icon'
                onClick={() => onPlayHandler(props.preview_url)}
              />}
          </Flex>
        </Flex >)}
    </div>
  )
};

export default SongCard;