import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPlaybleURls, setSongs } from '../../store/slices/playerSlice';
import './AudioPlayer.css';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSongs] = useState(0);
  const dispatch = useDispatch();

  const audioPlayer = document.querySelector('#audio');

  const onPlay = () => {
    if (isPlaying) {
      audioPlayer.pause();
      setIsPlaying(false);
    }
    audioPlayer.play();
    setIsPlaying(true);
  };

  const songsIDs = useSelector(state => state.playerReducer.songs);
  const currentSongURL = useSelector(state => state.playerReducer.playbleURLs);

  useEffect(() => {
    dispatch(setPlaybleURls(songsIDs));
  }, [songsIDs]);

  return (
    <Flex justify='center' gap='3em' align='center' h='100%'>
      <i className="bi bi-skip-start next-icon" onClick={() => setCurrentSongs(currentSong - 1)}></i>
      <audio src={currentSongURL === null ? '' : currentSongURL[currentSong]} id='audio'></audio>

      {isPlaying ? <i className="bi bi-pause play-icon" onClick={() => onPlay()}></i> : <i className="bi bi-play-fill play-icon" onClick={() => onPlay()}></i>}
      <i className="bi bi-skip-end next-icon" onClick={() => setCurrentSongs(currentSong + 1)}></i>
    </Flex>
  )
};
export default AudioPlayer;