import React from 'react';
import './ArtistCard.css';
import { Link } from 'react-router-dom';
import { Image, Flex, Tag, Text, Box } from '@chakra-ui/react';



const ArtistCard = ({ name, imgURL, artistID, width }) => {
  const link = `artists/${artistID}`;

  return (
    <Flex direction='column' gap='.5em' justify='flex-start' mt='3em'
      align='flex-start'>

      <Image src={imgURL} w='240px' h='240px'
        fallbackSrc='https://via.placeholder.com/240' />

      <Link to={link}><Text fontSize='1em' transtion='color 0.33s'
        _hover={{ color: 'primary' }}
        w='100%'>{name}</Text></Link >
      <Tag w='100px' fontSize='1em'
        paddingInlineStart='30px'>Artist</Tag>
    </Flex >
  )
};

export default ArtistCard;

