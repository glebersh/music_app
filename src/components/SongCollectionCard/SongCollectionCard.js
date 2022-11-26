import { Box, Image, Text, Flex } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';



const SongCollectionCard = (props) => {
  const { name, coverURL, id, artist, type, owner, artistID } = props;
  const link = `artists/${artistID}`;

  return (
    <Flex m='1em 0 0 0' direction='column' align='center' justify='flex-start'
      maxW='300px'>
      <Image src={coverURL} maxW='300px' maxH='300px' fallbackSrc='https://via.placeholder.com/300' />
      <Text w='80%' textAlign='center'>{name}</Text>
      <Link to={link}><Text
        _hover={{ color: 'primary' }}>{artist}</Text></Link>
      {type === 'playlists' ? <Text>{owner}</Text> : null}
    </Flex >
  )
};

export default SongCollectionCard;