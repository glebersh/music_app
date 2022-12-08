import { Button, Flex, useColorMode } from '@chakra-ui/react';
import React, { useState } from 'react';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import Tracklist from '../Tracklist/Tracklist';
import './Footer.css';

const Footer = () => {
  const [tracklistVisibible, setTracklistVisibility] = useState(false);

  return (
    <footer>
      <Flex w='100%' align='center'>
        <AudioPlayer />
        <Button onClick={() => setTracklistVisibility(!tracklistVisibible)} m='0 2em 0 auto' variant='outline' color='white'
          _hover={{ backgroundColor: '#202020' }}>
          {tracklistVisibible ? 'Hide tracklist' : 'Show tracklist'}</Button>
      </Flex>
      {tracklistVisibible && <Tracklist />}

    </footer>
  )
};

export default Footer;
