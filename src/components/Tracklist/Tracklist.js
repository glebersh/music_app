import { Flex, Box, Spinner, Alert, AlertTitle, AlertDescription, AlertIcon, Text, Image } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';

const Tracklist = () => {
  const playlist = useSelector(state => state.playerReducer.songsCollection);
  const songsCollectionType = useSelector(state => state.playerReducer.songsCollectionType);
  const loadingStatus = useSelector(state => state.playerReducer.loadingStatus);
  const errorStatus = useSelector(state => state.playerReducer.errorStatus);
  const currentSong = useSelector(state => state.playerReducer.currentSong);

  const coverImage = loadingStatus === 'resolved' ? songsCollectionType === 'songs' ?
    currentSong?.album?.images[0]?.url :
    songsCollectionType === 'albums' ?
      playlist?.images[0]?.url : currentSong?.track?.album?.images[0]?.url : null;


  const albumName = loadingStatus === 'resolved' ? songsCollectionType === 'songs' ? currentSong?.album?.name : playlist?.name : null;


  return (
    <>
      {errorStatus &&
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Something went wrong...</AlertTitle>
          <AlertDescription>Check the API response</AlertDescription>
        </Alert>}

      {loadingStatus === 'loading' && <Spinner w='150px' h='150px' />}

      {loadingStatus === 'resolved' ?
        <Flex m='0 auto' w='80%' justify='space-between' align='center' id='tracklist' pb='20px'>
          <Box flex='1' maxW='500px'>
            {songsCollectionType === 'albums' ?
              playlist?.tracks?.items.map(item => <TracklistItem key={item.id} {...item} />)
              : playlist?.items.map(item => <TracklistItem key={item.id} {...item} />)}
          </Box>
          <Box>
            <Image src={coverImage} w='500px' />
            <Text fontWeight='700'
              fontSize='24px' textAlign='center'>{albumName}</Text>
          </Box>
        </Flex>
        : null}
    </>
  )

};

export default Tracklist;


const TracklistItem = (props) => {
  const currentSong = useSelector(state => state.playerReducer.currentSong);

  const millisToMinutesAndSeconds = (milliseconds) => {
    var minutes = Math.floor(milliseconds / 60000);
    var seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return (
      seconds == 60 ?
        (minutes + 1) + ":00" :
        minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    );
  };
  return (
    <Flex mt='1em'>
      <Text color={currentSong?.id === props.id ? 'primary' : 'white'}
        fontWeight={currentSong?.id === props.id ? '700' : '300'}
        fontSize='18px'
      >{props?.name}</Text>
      <Text color='lightgray' ml='auto'>{millisToMinutesAndSeconds(props?.duration_ms)}</Text>
    </Flex>
  )
};

