import React from 'react';
import './ArtistCard.css';

const ArtistCard = ({ name, imgURL, artistID }) => {
  return (
    <div>
      <img src={imgURL} />
      <p>{name}</p>
      <p>Artist</p>
    </div >
  )
};

export default ArtistCard;