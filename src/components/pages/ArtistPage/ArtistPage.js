import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getArtistGeneral } from '../../../store/slices/artistInfoSlice';
import { Spinner, Text, Image, Tag, Flex, Box, Grid } from '@chakra-ui/react';
import SongsList from '../../SongsList/';
import SongCollectionsList from '../../SongCollectionsList/';


const ArtistPage = () => {
  let { artistID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtistGeneral(artistID));
  }, [artistID]);


  const data = useSelector(state => state.artistInfoReducer.artistInfo);
  const loading = useSelector(state => state.artistInfoReducer.isLoading);

  return (
    <>
      {loading ? <Spinner w='200px' h='200px' /> :
        (
          <>
            <Flex w='100%' justify='center' gap='5em' mt='5em'>
              <Image src={data.images ? data.images[0].url : null} loading="lazy" />
              <Box>
                <Text fontSize='3em'>{data.name}</Text>
                <Tag fontSize='1em'>Artist</Tag>
                <Text>Popularity: {data.popularity}</Text>
                {data.genres ?
                  <h2>Genres:
                    {data.genres.map(item => <Tag key={item}>{item}</Tag>)}
                  </h2> : null}
                <Text>Followers: {data.followers.total}</Text>
                <Text border='1px solid lightgray' textAlign='center'
                  p='.2em' borderRadius='5px' transition='.33s'
                  _hover={{ color: 'primary', backgroundColor: '#A0A0A020', transition: '.33s' }}><Link to='/'>BACK TO SEARCH</Link></Text>
              </Box>
            </Flex>
            <Text fontSize='2.5em' w='100%' m='3em auto 1.5em' paddingInlineStart='5em'>TOP TRACKS</Text>
            <Grid gridTemplateColumns='1fr 1fr' w='80%'>
              <SongsList type={'ARTIST_TOP_TRACKS'} />
            </Grid>
            <Text fontSize='2.5em' w='100%' m='3em auto 1.5em' paddingInlineStart='5em'>ARTIST ALBUMS</Text>
            <Flex direction='row' justify='space-evenly' w='90%' flexWrap='wrap'>
              <SongCollectionsList type={'ARTIST_ALBUMS'} />
            </Flex>
          </>
        )}

    </>
  )
};
export default ArtistPage;