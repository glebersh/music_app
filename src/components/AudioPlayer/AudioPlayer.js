import { Flex, Box, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong, setCurrentSongID, setIsPlaying, setNextSong } from '../../store/slices/playerSlice';
import './AudioPlayer.css';

const AudioPlayer = () => {
  const dispatch = useDispatch();

  const isPlaying = useSelector(state => state.playerReducer.isPlaying);
  const currentSongURL = useSelector(state => state.playerReducer.currentSong);
  const currentSongGeneral = useSelector(state => state.playerReducer.currentSongGeneral);
  const previousSong = useSelector(state => state.playerReducer.previousSong);
  const previousSongID = useSelector(state => state.playerReducer.previousSongID);
  const nextSong = useSelector(state => state.playerReducer.nextSong);
  const searchResult = useSelector(state => state.searchReducer.searchResult);


  const audioPlayer = document.querySelector('#audio');
  const link = `artists/${currentSongGeneral.artistID}`;

  useEffect(() => {
    if (document.readyState === 'complete') {
      if (isPlaying) {
        audioPlayer.play();
      }
      else if (!isPlaying) {
        audioPlayer.pause();
      }
    }
  }, [isPlaying, currentSongURL]);


  const onPlay = () => {
    dispatch(setIsPlaying(!isPlaying));
  };

  const playPreviousSong = () => {
    if (previousSong !== '' && previousSong !== currentSongURL) {
      dispatch(setCurrentSong(previousSong));
      dispatch(setCurrentSongID(previousSongID));
    }
  };

  const playNextSong = () => {
    dispatch(setCurrentSong(nextSong.preview_url));
    dispatch(setCurrentSongID(nextSong.id));
    dispatch(setNextSong(currentSongGeneral.nextSong));
  };

  return (
    <Flex justify='space-between' gap='3em' align='center' h='100%'>
      <Flex justify='space-evenly' gap='1.5em' align='center' ml='5em'>
        <Image src={currentSongGeneral.coverURL} fallbackSrc='https://via.placeholder.com/64' maxW='64px' maxH='64px' />
        <Flex direction='column' ml='1em'>
          <Box>
            <Text w='100%' fontWeight='700' display='inline' mr='1em' color='white'>{currentSongGeneral.name}</Text>
            <span>{currentSongGeneral.explicit ? <i className="bi bi-explicit"></i> : null}</span>
          </Box>
          <Text minW='100%' color='white'>{currentSongGeneral.albumOfTrack}</Text>
          <Link to={link}><Text color='white' _hover={{
            cursor: 'pointer',
            color: 'primary'
          }}>{currentSongGeneral.artist}</Text></Link>
        </Flex>
      </Flex>
      <Flex justify='flex-start' w='64%'>
        <Flex justify='center' gap='3em' align='center' h='100%'>
          <i className="bi bi-skip-start next-icon"
            onClick={(e) => playPreviousSong(e)}></i>

          <audio src={currentSongURL === null ? '' : currentSongURL} id='audio' controls></audio>

          {isPlaying ? <i className="bi bi-pause play-icon" onClick={() => onPlay()}></i> : <i className="bi bi-play-fill play-icon" onClick={() => onPlay()}></i>}
          <i className="bi bi-skip-end next-icon" onClick={() => playNextSong()}></i>
        </Flex>
      </Flex>
    </Flex>
  )
};
export default AudioPlayer;