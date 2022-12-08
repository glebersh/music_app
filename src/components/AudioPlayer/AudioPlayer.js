import { Flex, Box, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong, setIsPlaying, setPreviousSong, setSongsCollectionType } from '../../store/slices/playerSlice';
import './AudioPlayer.css';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const AudioPlayer = () => {
  const dispatch = useDispatch();

  const isPlaying = useSelector(state => state.playerReducer.isPlaying);
  const currentSong = useSelector(state => state.playerReducer.currentSong);
  const previousSong = useSelector(state => state.playerReducer.previousSong);
  const playlist = useSelector(state => state.playerReducer.songsCollection);
  const collectionType = useSelector(state => state.playerReducer.songsCollectionType);

  const loadingStatus = useSelector(state => state.playerReducer.loadingStatus);

  const audioPlayer = document.querySelector('#audio');

  useEffect(() => {
    if (audioPlayer) {
      if (isPlaying) {
        audioPlayer.play();
      }
      else if (!isPlaying) {
        audioPlayer.pause();
      }
    }
  }, [isPlaying, currentSong.preview_url]);


  const onPlay = () => {
    dispatch(setIsPlaying(!isPlaying));
  };

  const playPreviousSong = () => {
    if (previousSong.preview_url !== '' && previousSong?.preview_url !== currentSong?.preview_url) {
      dispatch(setCurrentSong(previousSong));
    }
    if (collectionType === 'albums') {
      if (currentSong?.track_number > 0) {
        const previousIndex = currentSong?.track_number - 2;
        dispatch(setCurrentSong(playlist?.tracks?.items[previousIndex]));
      }
    }
    else if (collectionType === 'songs') {
      dispatch(setSongsCollectionType('albums'));
      dispatch(setCurrentSong(previousSong));
    }
  };

  const playNextSong = () => {
    if (collectionType === 'albums') {
      if (currentSong.track_number <= playlist?.total_tracks) {
        dispatch(setPreviousSong(currentSong));
        dispatch(setCurrentSong(playlist?.tracks?.items[currentSong.track_number]));
      }
    };
  }


  const coverImage = loadingStatus === 'resolved' ? collectionType === 'songs' ?
    currentSong?.album?.images[0]?.url :
    collectionType === 'albums' ?
      playlist?.images[0]?.url : currentSong?.track?.album?.images[0]?.url : null;

  const trackName = loadingStatus === 'resolved' ? collectionType === 'songs' ? currentSong?.name : collectionType === 'playlists' ?
    currentSong?.track?.name : currentSong?.name : null;

  const previewLink = loadingStatus === 'resolved' ? collectionType === 'songs' ? currentSong?.preview_url : collectionType === 'playlists' ?
    currentSong?.track?.preview_url : currentSong?.preview_url : null;

  const artistName = loadingStatus === 'resolved' ? collectionType === 'songs' ? currentSong?.album?.artists[0]?.name :
    collectionType === 'albums' ? playlist?.artists[0]?.name : currentSong?.track?.artists[0]?.name : null;

  const artistID = loadingStatus === 'resolved' ? collectionType === 'songs' ?
    currentSong?.artists[0]?.id :
    collectionType === 'albums' ?
      currentSong?.artists[0]?.id : currentSong?.track?.artists[0]?.id : null;

  const albumName = loadingStatus === 'resolved' ? collectionType === 'songs' ? currentSong?.album?.name : playlist?.name : null;


  return (
    <ErrorBoundary>
      <Flex justify='space-between' gap='3em' align='center' h='100%'>
        <Flex justify='space-evenly' gap='1.5em' align='center' ml='5em' minW='300px' p='1em'>
          <Image src={coverImage} fallbackSrc='https://via.placeholder.com/64' maxW='64px' maxH='64px' loading="lazy" />
          <Flex direction='column' ml='1em'>
            <Box>
              <Text w='100%' fontWeight='700' display='inline' mr='1em' color='white'>{trackName}</Text>
              <span>{currentSong?.explicit && <i className="bi bi-explicit"></i>}</span>
            </Box>
            <Text color='white' minW='300px'>{albumName}</Text>
            <Link to={loadingStatus === 'resolved' ? `artists/${artistID}` : ''}><Text color='white'
              _hover={{
                cursor: 'pointer',
                color: 'primary'
              }}>{artistName}</Text></Link>
          </Flex>
        </Flex>
        <Flex justify='flex-start' w='64%'>
          <Flex justify='center' gap='3em' align='center' h='100%'>
            {currentSong.track_number === 1 && collectionType === 'albums' ? null : <i className="bi bi-skip-start next-icon"
              onClick={(e) => playPreviousSong(e)}></i>}

            <audio src={previewLink} id='audio' controls></audio>

            {isPlaying ? <i className="bi bi-pause play-icon" onClick={() => onPlay()}></i> : <i className="bi bi-play-fill play-icon" onClick={() => onPlay()}></i>}

            {currentSong.track_number === playlist.total_tracks & collectionType === 'albums' ? null : <i className="bi bi-skip-end next-icon" id='next-button'
              onClick={(e) => playNextSong(e)}></i>}
          </Flex>
        </Flex>
      </Flex>
    </ErrorBoundary>
  )
};
export default AudioPlayer;