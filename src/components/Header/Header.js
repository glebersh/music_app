import { background, Button, Flex, Text, transition, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import React from 'react';
import Search from '../Search';

const Header = () => {

  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex w='100%' align='center' mt='5em' justify='flex-start'>
      <Text fontWeight='700' fontSize='2em' ml='5em' mr='5em'>
        AppLogo</Text>
      <Search />
      <Button onClick={toggleColorMode}
        variant='outline'
        minW='100px'
        borderColor='primary'
        m='0 5em 0 auto'
        transition='0.36s'
        _hover={colorMode === 'light' ? { backgroundColor: '#F5F5F5' } : { backgroundColor: '#202020' }}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Flex >
  )
};

export default Header;
