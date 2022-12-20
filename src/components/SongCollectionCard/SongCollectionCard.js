import { Box, Image, Text, Flex } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSongCollectionTracks, setPreviousSong } from '../../store/slices/playerSlice';
import './SongCollectionCard.css';


const SongCollectionCard = (props) => {
  const dispatch = useDispatch();
  const currentSong = useSelector(state => state.playerReducer.currentSong);

  const { id } = props;
  const playlistType = props?.collectionType === 'ALBUMS' ||
    props?.collectionType === 'ARTIST_ALBUMS' ?
    'albums' : props?.collectionType.toLowerCase();

  const onAlbumClick = () => {
    dispatch(setPreviousSong(currentSong));
    dispatch(getSongCollectionTracks({ id, playlistType }));
  };

  return (
    (<Flex m='1em 0 0 0' direction='column'
      align='center' justify='flex-start'
      onClick={() => onAlbumClick()}
      maxW='300px'
      data-testid='album-container'>
      <Box position='relative'>
        <Image src={props?.images[0]?.url}
          maxW='300px'
          maxH='300px'
          fallbackSrc='https://via.placeholder.com/300'
          _hover={{ filter: 'brightness(50%)', transition: '0.44s', cursor: 'pointer' }} className='album-cover'
          transition='0.44s' loading="lazy" />
        <i className='bi bi-play-fill song-collection-icon' />
      </Box>
      <Text w='80%' textAlign='center'>{props?.name}</Text>

      {props?.collectionType === 'ALBUMS' &&
        <Link to={`artists/${props?.artists[0]?.id}`}>
          <Text _hover={{ color: 'primary' }}>
            {props?.collectionType === 'ALBUMS'
              && props?.artists[0]?.name}
          </Text>
        </Link>}

      {props.collectionType === 'PLAYLISTS' && <Text>
        {props.collectionType === 'PLAYLISTS'
          && props?.owner?.display_name}
      </Text>}

    </Flex >)
  )
};

export default SongCollectionCard;