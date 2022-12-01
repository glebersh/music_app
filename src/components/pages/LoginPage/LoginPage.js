import React from 'react';
import { Text, Image, Flex, useColorMode, Button } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import SpotifyLogo from '../../../assets/images/Spotify_Logo_RGB_Green.png';
import { authEndpoint } from '../../App/App';

const CLIENT_ID = "ea5fd0d4cfe147699b87b05db7e6f7bb"
const REDIRECT_URI = "http://localhost:3000/"

const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
];



const LoginPage = () => {

  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex direction='column' justify='center' align='center'>
      <Image src={SpotifyLogo} maxW='320px' mt='3em' loading="lazy" />
      <Text fontSize='4em' color='primary' letterSpacing='.2em' mt='2em'>LOGIN</Text>
      <Flex h='40px' w='200px' border='1px solid lightgray' mt='2em'
        justify='center' align='center'
        borderRadius='7px'
        _hover={{ backgroundColor: '#99999970', cursor: 'pointer' }}>
        <a className="btn btn--loginApp-link"
          href={`${authEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join("%20")}&response_type=token`}>
          via Spotify Account</a></Flex>
      <Button onClick={toggleColorMode}
        variant='outline'
        minW='100px'
        borderColor='primary'
        mt='2em'
        transition='0.36s'
        _hover={colorMode === 'light' ? { backgroundColor: '#F5F5F5' } : { backgroundColor: '#202020' }}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Flex>
  )
};

export default LoginPage;