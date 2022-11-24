import React from 'react';
import './ArtistCard.css';
import { Link } from 'react-router-dom';
import { Image, Flex, Tag, Text } from '@chakra-ui/react';

const ArtistCard = ({ name, imgURL, artistID, type, width }) => {
  const link = `artists/${artistID}`;

  const svgPlaceholder = (<svg role="img" height="24" width="24"
    ariaHidden="true" viewBox="0 0 24 24"
    className="svg">
    <path d="M13.363 10.474l-.521.625a2.499
2.499 0 00.67 3.766l.285.164a5.998 5.998
0 011.288-1.565l-.573-.33a.5.5 0 01-.134-.754l.52-.624a7.372 7.372
 0 001.837-4.355 7.221 7.221 0 00-.29-2.489 5.644 5.644 0 
 00-3.116-3.424A5.771 5.771 0 006.753 2.87a5.7 5.7 0 00-1.19 2.047
  7.22 7.22 0 00-.29 2.49 7.373 7.373 0 001.838 4.355l.518.622a.5.5
   0 01-.134.753L3.5 15.444a5 5 0 00-2.5 4.33v2.231h13.54a5.981 5.981
    0 01-1.19-2H3v-.23a3 3 0 011.5-2.6l3.995-2.308a2.5 2.5 0 
    00.67-3.766l-.521-.625a5.146 5.146 0 01-1.188-4.918 3.71 3.71
     0 01.769-1.334 3.769 3.769 0 015.556 0c.346.386.608.84.768
      1.334.157.562.22 1.146.187 1.728a5.379 5.379 0 01-1.373
       3.188zm7.641-1.173a1 1 0 00-1 1v4.666h-1a3 3 0 103
        3v-7.666a.999.999 0 00-1.003-1h.003zm-1 8.666a1
         1 0 11-1-1h1v1z"></path></svg>)

  return (
    <Flex direction='column' gap='.5em' justify='flex-start' mt='3em'
      align='flex-start' maxW={type === 'topResult' ? '640px' : '320px'}
      ml={type === 'topResult' ? '0' : '0'}>

      <Image src={width < 160 ? null : imgURL} w={type === 'topResult' ? '640px' : '240px'}
        fallbackSrc={type === 'topResult' ? 'https://via.placeholder.com/640' : svgPlaceholder} />

      <Link to={link}><Text fontSize={type === 'topResult' ? '2em' : '1em'} transtion='color 0.33s'
        _hover={{ color: 'primary' }}
        w='100%'>{name}</Text></Link>
      <Tag w='100px' fontSize='1em'
        paddingInlineStart='30px'>Artist</Tag>
    </Flex >
  )
};

export default ArtistCard;

