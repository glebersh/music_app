import React from 'react';
import './ArtistCard.css';
import { Link } from 'react-router-dom';

const ArtistCard = ({ name, imgURL, artistID }) => {
  const link = `artists/${artistID}`;
  return (
    <div>
      <img src={imgURL} />
      <Link to={link}>{name}</Link>
      <p>Artist</p>
    </div >
  )
};

export default ArtistCard;

