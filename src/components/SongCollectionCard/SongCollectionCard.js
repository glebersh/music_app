import React from 'react';
import { Link } from 'react-router-dom';



const SongCollectionCard = (props) => {
  const { name, coverURL, id, artist, type, owner, artistID } = props;
  const link = `artists/${artistID}`;
  return (
    <div>
      <img src={coverURL} />
      <p>{name}</p>
      <Link to={link}>{artist}</Link>
      {type === 'playlists' ? <p>{owner}</p> : null}
    </div>
  )
};

export default SongCollectionCard;