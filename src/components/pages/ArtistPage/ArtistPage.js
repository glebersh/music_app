import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getArtistGeneral } from '../../../store/slices/artistInfoSlice';
import { Spinner, Text, Image, Tag, Flex, Box, Grid, Alert, AlertTitle, AlertDescription, AlertIcon } from '@chakra-ui/react';
import SongsList from '../../SongsList/';
import SongCollectionsList from '../../SongCollectionsList/';


const ArtistPage = () => {
  let { artistID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtistGeneral(artistID));
  }, [artistID]);


  const data = useSelector(state => state.artistInfoReducer.artistInfo);
  const loadingStatus = useSelector(state => state.artistInfoReducer.loadingStatus);
  const errorStatus = useSelector(state => state.artistInfoReducer.errorStatus);

  return (
    <>
      {errorStatus &&
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Something went wrong...</AlertTitle>
          <AlertDescription>Check the API response</AlertDescription>
        </Alert>}
      {loadingStatus === 'loading' && <Spinner w='150px' h='150px' />}
      {loadingStatus === 'resolved' &&
        <>
          <Flex w='100%' justify='center' gap='5em' mt='5em'>
            <Image src={data?.images[0]?.url} loading="lazy" />
            <Box>
              <Text fontSize='3em'>{data?.name}</Text>
              <Tag fontSize='1em' mt='1em'>Artist</Tag>
              <Text mt='1em'>Popularity: {data?.popularity}</Text>
              {data.genres &&
                <Text mt='1em'>Genres:
                  {data?.genres.map(item => <Tag key={item} ml='.5em'>{item}</Tag>)}
                </Text>}
              <Text mt='1em'>Followers: {data?.followers?.total}</Text>
              <Text border='1px solid lightgray' textAlign='center'
                p='.2em' borderRadius='5px' transition='.33s' mt='1em' maxW='200px'
                _hover={{ color: 'primary', backgroundColor: '#A0A0A020', transition: '.33s' }}><Link to='/'>BACK TO SEARCH</Link></Text>
            </Box>
          </Flex>
          <Text fontSize='2.5em' w='100%' m='3em auto 1.5em' paddingInlineStart='5em'>TOP TRACKS</Text>
          <Grid gridTemplateColumns='1fr 1fr' w='80%'>
            <SongsList type='ARTIST_TOP_TRACKS' />
          </Grid>
          <Text fontSize='2.5em' w='100%' m='3em auto 1.5em' paddingInlineStart='5em'>ARTIST ALBUMS</Text>
          <Flex direction='row' justify='space-evenly' w='90%' flexWrap='wrap'>
            <SongCollectionsList collectionType='ARTIST_ALBUMS' />
          </Flex>
        </>}
    </>
  )
};
export default ArtistPage;