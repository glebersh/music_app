import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { createContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SongCard.css';

import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong, setCurrentSongGeneral, setCurrentSongID, setIsPlaying, setNextSong, setPreviousSong } from '../../store/slices/playerSlice';

const SongCard = ({ name, coverURL, albumOfTrack, artist, artistID, duration, explicit, playURL, id, nextSong }) => {

  const link = `artists/${artistID}`;

  const isPlaying = useSelector(state => state.playerReducer.isPlaying);
  const currentSongID = useSelector(state => state.playerReducer.currentSongID);
  const currentSongURL = useSelector(state => state.playerReducer.currentSong);
  const previousSong = useSelector(state => state.playerReducer.previousSong);
  const dispatch = useDispatch();

  const millisToMinutesAndSeconds = (milliseconds) => {
    var minutes = Math.floor(milliseconds / 60000);
    var seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return (
      seconds == 60 ?
        (minutes + 1) + ":00" :
        minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    );
  };

  const onPlayHandler = (e, playbleLink) => {
    if (playbleLink !== currentSongURL && isPlaying) {
      dispatch(setPreviousSong({ currentSongURL, currentSongID }));
      dispatch(setCurrentSong(playbleLink));
      dispatch(setCurrentSongID(e.target.id));
      dispatch(setCurrentSongGeneral({ name, coverURL, albumOfTrack, artist, explicit, artistID }));
      dispatch(setNextSong({ nextSong }));
    }
    else if (playbleLink !== currentSongURL && !isPlaying) {
      dispatch(setPreviousSong({ currentSongURL, currentSongID }));
      dispatch(setCurrentSong(playbleLink));
      dispatch(setCurrentSongID(e.target.id));
      dispatch(setIsPlaying());
      dispatch(setCurrentSongGeneral({ name, coverURL, albumOfTrack, artist, explicit, artistID }));
      dispatch(setNextSong({ nextSong }));
    }
    else if (playbleLink === currentSongURL) {
      dispatch(setIsPlaying());
    }
  };

  return (
    <Flex m='0 0 2em 0' align='center' justify='space-between' direction='row'>
      <Flex>

        <Image src={coverURL} fallbackSrc='https://via.placeholder.com/64' maxW='64px' maxH='64px' />

        <Flex direction='column' ml='1em'>
          <Box>
            <Text w='100%' fontWeight='700' display='inline' mr='1em'>{name}</Text>
            <span>{explicit ? <i className="bi bi-explicit"></i> : null}</span>
          </Box>
          <Text minW='100%'>{albumOfTrack}</Text>
          <Link to={link}><Text _hover={{
            cursor: 'pointer',
            color: 'primary'
          }}>{artist}</Text></Link>
        </Flex>
      </Flex >

      <Flex direction='column' mr='3em'>
        <Text ml='auto' color='lightgray'>{millisToMinutesAndSeconds(duration)}</Text>
        {playURL === null ? null : isPlaying && currentSongID === id ? <i className='bi bi-pause song-card-icon' id={id}
          onClick={(e) => onPlayHandler(e, playURL)}
        /> : <i className='bi bi-play-fill song-card-icon' id={id}
          onClick={(e) => onPlayHandler(e, playURL)}
        />}
      </Flex>

    </Flex >

  )
};

export default SongCard;