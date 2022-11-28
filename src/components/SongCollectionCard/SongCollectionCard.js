import { Box, Image, Text, Flex } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSongCollectionTracks, setIsPlayingTrue, setNextSong, setPreviousSong } from '../../store/slices/playerSlice';
import './SongCollectionCard.css';


const SongCollectionCard = (props) => {
  const isEmpty = useSelector(state => state.searchReducer.isEmpty);
  const isLoading = useSelector(state => state.searchReducer.isLoading);
  const dispatch = useDispatch();
  const currentSong = useSelector(state => state.playerReducer.currentSong);
  const playlist = useSelector(state => state.playerReducer.songsCollection);


  const { id } = props;
  const playlistType = props.collectionType ? props.collectionType.toLowerCase() : '';

  const onAlbumClick = () => {
    dispatch(setPreviousSong(currentSong));
    dispatch(getSongCollectionTracks({ id, playlistType }));
    dispatch(setIsPlayingTrue(true));
  };
  const link = !isEmpty && !isLoading ? `artists/${props.artists[0].id}` : null;
  return (
    (<Flex m='1em 0 0 0' direction='column' align='center' justify='flex-start'
      onClick={() => onAlbumClick()}
      maxW='300px'>
      <Box position='relative'>
        <Image src={props.images[0].url} maxW='300px' maxH='300px' fallbackSrc='https://via.placeholder.com/300'
          _hover={{ filter: 'brightness(50%)', transition: '0.44s', cursor: 'pointer' }} className='album-cover'
          transition='0.44s' />
        <i className='bi bi-play-fill song-collection-icon' />
      </Box>
      <Text w='80%' textAlign='center'>{props.name}</Text>
      <Link to={link}>
        <Text _hover={{ color: 'primary' }}>{props.collectionType === 'ALBUMS' ? props.artists[0].name : null}</Text></Link>
      {props.collectionType === 'playlist' ? <Text>{props.collectionType === 'PLAYLISTS' ? props.owner.display_name : null}</Text> : null}

    </Flex >)
  )
};

export default SongCollectionCard;