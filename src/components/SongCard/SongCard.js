import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const SongCard = ({ name, coverURL, albumOfTrack, artist, artistID, duration }) => {
  const link = `artists/${artistID}`;

  const millisToMinutesAndSeconds = (milliseconds) => {
    var minutes = Math.floor(milliseconds / 60000);
    var seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return (
      seconds == 60 ?
        (minutes + 1) + ":00" :
        minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    );
  }

  return (
    <Flex m='0 0 2em 0' align='center' justify='flex-start'>
      <Image src={coverURL} fallbackSrc='https://via.placeholder.com/64' maxW='64px' maxH='64px' />
      <Flex direction='column' ml='1em'>
        <Text w='100%' fontWeight='700'>{name}</Text>
        <Flex w='100%'>
          <Text minW='100%'>{albumOfTrack}</Text>
          <Text ml='auto' color='lightgray'>{millisToMinutesAndSeconds(duration)}</Text>
        </Flex>
        <Link to={link}><Text _hover={{
          cursor: 'pointer',
          color: 'primary'
        }}>{artist}</Text></Link>
        <Flex></Flex>
      </Flex>
    </Flex >
  )
};

export default SongCard;