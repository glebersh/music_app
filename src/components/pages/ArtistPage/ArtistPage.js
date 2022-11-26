import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getArtistGeneral, getArtistTopTracks, getArtistTopAlbums } from '../../../store/slices/artistInfoSlice';
import { Spinner, Text, Image, List, ListItem, Tag, Flex, Box } from '@chakra-ui/react';
import SongsList from '../../SongsList/SongsList';
import SongCollectionsList from '../../SongCollectionsList/SongCollectionsList';


const ArtistPage = () => {
  let { artistID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtistGeneral(artistID));
  }, []);


  const data = useSelector(state => state.artistInfoReducer.artistInfo);
  const loading = useSelector(state => state.artistInfoReducer.isLoading);

  return (
    <>
      <Link to='/'>BACK TO SEARCH</Link>
      {loading ? <Spinner w='200px' h='200px' /> :
        (
          <>
            <Flex>
              <Image src={data.images ? data.images[0].url : null} />
              <Box>
                <Text>{data.name}</Text>
                <Tag>Artist</Tag>
                <Text>Popularity: {data.popularity}</Text>
                {data.genres ?
                  <List>Genres:
                    {data.genres.map(item => <ListItem key={item}>{item}</ListItem>)}
                  </List> : null}
                <Text>Followers: {data.followers.total}</Text>
              </Box>
            </Flex>
            <Box>
              <SongsList type={'ARTIST_TOP_TRACKS'} />
              <SongCollectionsList type={'ARTIST_ALBUMS'} />
            </Box>
          </>
        )}

    </>
  )
};
export default ArtistPage;