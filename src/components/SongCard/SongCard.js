import React from 'react';
import { Link } from 'react-router-dom';

const SongCard = ({ name, coverURL, albumOfTrack, id, artist, artistID }) => {
  const link = `artists/${artistID}`;
  return (
    <div>
      <img src={coverURL} />
      <p>{name}</p>
      <p>{albumOfTrack}</p>
      <Link to={link}>{artist}</Link>
    </div >
  )
};

export default SongCard;