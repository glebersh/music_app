import { AlertIcon, Button, Flex, Text, Alert, useColorMode, CloseButton } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import React from 'react';
import Search from '../Search';

const Header = () => {

  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Alert status='info' w='50%' id='token-alert' data-testid='alert-toast'>
        <AlertIcon />
        Keep in mind, that access token expire time is 1 hour,
        after this time you will be redirected to login page!
        <CloseButton onClick={() =>
          document.querySelector('#token-alert').style.display = 'none'}
          ml='auto'
          role='alert-close-button' />
      </Alert>

      <Flex w='100%' align='center' mt='5em' justify='center'
        direction={{ xs: "column", xl: "row" }}>
        <Text fontWeight='700' fontSize='2em' ml='5em' mr='5em'>
          AppLogo</Text>
        <Search />
        <Button onClick={toggleColorMode}
          variant='outline'
          minW='100px'
          borderColor='primary'
          m='0 5em 0 auto'
          transition='0.36s'
          _hover={colorMode === 'light' ? { backgroundColor: '#F5F5F5' }
            : { backgroundColor: '#202020' }}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex >
    </>
  )
};

export default Header;
