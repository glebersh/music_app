import SongCard from "./SongCard";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

import * as reduxHooks from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import * as actions from '../../store/slices/playerSlice';

jest.mock('../../store/slices/playerSlice');
const mockedSetPreviousSong = jest.spyOn(actions, 'setPreviousSong');
const mockedSetCurrentSong = jest.spyOn(actions, 'setCurrentSong');
const mockedSetSongsCollectionType = jest.spyOn(actions, 'setSongsCollectionType');
const mockedSetIsPlaying = jest.spyOn(actions, 'setIsPlaying');

jest.mock('react-redux');
const mockedUseSelector = jest.spyOn(reduxHooks, 'useSelector');
const mockedUseDispatch = jest.spyOn(reduxHooks, 'useDispatch');


const mockedSongData = {
  album: {
    album_type: 'album',
    artists: [
      {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/1z4g3DjTBBZKhvAroFlhOM'
        },
        href: 'https://api.spotify.com/v1/artists/1z4g3DjTBBZKhvAroFlhOM',
        id: '1z4g3DjTBBZKhvAroFlhOM',
        name: 'Red Velvet',
        type: 'artist',
        uri: 'spotify:artist:1z4g3DjTBBZKhvAroFlhOM'
      }
    ],
    href: 'https://api.spotify.com/v1/albums/3rVtm00UfbuzWOewdm4iYM',
    id: '3rVtm00UfbuzWOewdm4iYM',
    images: [
      {
        height: 64,
        url: 'https://i.scdn.co/image/ab67616d00004851df5022bdf1ac4bf52135c4be',
        width: 64
      }
    ],
    name: '‘The ReVe Festival’ Finale',
    type: 'album',
    uri: 'spotify:album:3rVtm00UfbuzWOewdm4iYM'
  },
  artists: [
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/1z4g3DjTBBZKhvAroFlhOM'
      },
      href: 'https://api.spotify.com/v1/artists/1z4g3DjTBBZKhvAroFlhOM',
      id: '1z4g3DjTBBZKhvAroFlhOM',
      name: 'Red Velvet',
      type: 'artist',
      uri: 'spotify:artist:1z4g3DjTBBZKhvAroFlhOM'
    }
  ],
  duration_ms: 210560,
  explicit: false,
  href: 'https://api.spotify.com/v1/tracks/3CYH422oy1cZNoo0GTG1TK',
  id: '3CYH422oy1cZNoo0GTG1TK',
  name: 'Psycho',
  preview_url: 'https://p.scdn.co/mp3-preview/786146ba24ff84e70da6021c141b1ddd843a6fc0?cid=ea5fd0d4cfe147699b87b05db7e6f7bb',
};

const mockedSecondSong = {
  album: {
    album_type: 'album',
    artists: [
      {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/1z4g3DjTBBZKhvAroFlhOM'
        },
        href: 'https://api.spotify.com/v1/artists/1z4g3DjTBBZKhvAroFlhOM',
        id: '1z4g3DjTBBZKhvAroFlhOM',
        name: 'Red Velvet',
        type: 'artist',
        uri: 'spotify:artist:1z4g3DjTBBZKhvAroFlhOM'
      }
    ],
    external_urls: {
      spotify: 'https://open.spotify.com/album/6MNlcai3skKLKv5syzFwC3'
    },
    href: 'https://api.spotify.com/v1/albums/6MNlcai3skKLKv5syzFwC3',
    id: '6MNlcai3skKLKv5syzFwC3',
    images: [
      {
        height: 640,
        url: 'https://i.scdn.co/image/ab67616d0000b2733f30a062dafcdbc1a8fad842',
        width: 640
      },
      {
        height: 300,
        url: 'https://i.scdn.co/image/ab67616d00001e023f30a062dafcdbc1a8fad842',
        width: 300
      },
      {
        height: 64,
        url: 'https://i.scdn.co/image/ab67616d000048513f30a062dafcdbc1a8fad842',
        width: 64
      }
    ],
    name: 'Russian Roulette - The 3rd Mini Album',
    release_date: '2016-09-07',
    release_date_precision: 'day',
    total_tracks: 7,
    type: 'album',
    uri: 'spotify:album:6MNlcai3skKLKv5syzFwC3'
  },
  artists: [
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/1z4g3DjTBBZKhvAroFlhOM'
      },
      href: 'https://api.spotify.com/v1/artists/1z4g3DjTBBZKhvAroFlhOM',
      id: '1z4g3DjTBBZKhvAroFlhOM',
      name: 'Red Velvet',
      type: 'artist',
      uri: 'spotify:artist:1z4g3DjTBBZKhvAroFlhOM'
    }
  ],
  disc_number: 1,
  duration_ms: 211243,
  explicit: false,
  external_ids: {
    isrc: 'KRA301600315'
  },
  external_urls: {
    spotify: 'https://open.spotify.com/track/5HiSc2ZCGn8L3cH3qSwzBT'
  },
  href: 'https://api.spotify.com/v1/tracks/5HiSc2ZCGn8L3cH3qSwzBT',
  id: '5HiSc2ZCGn8L3cH3qSwzBT',
  is_local: false,
  is_playable: true,
  name: '러시안 룰렛 Russian Roulette',
  popularity: 71,
  preview_url: 'https://p.scdn.co/mp3-preview/4bcebb26f081af2193258ec4dcef59a97a8dad34?cid=ea5fd0d4cfe147699b87b05db7e6f7bb',
  track_number: 1,
  type: 'track',
  uri: 'spotify:track:5HiSc2ZCGn8L3cH3qSwzBT'
};

describe('Song card tests', () => {
  it('Should render and match snapshot if loading is ended', () => {
    mockedUseSelector
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(false);

    const songCard = render(
      <BrowserRouter>
        <SongCard
          {...mockedSongData} />
      </BrowserRouter>);
    expect(songCard).toMatchSnapshot();
  });

  it('Should not render if loading is not ended', () => {
    mockedUseSelector
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce('loading');

    const songCard = render(
      <BrowserRouter>
        <SongCard
          {...mockedSongData} />
      </BrowserRouter>);
    expect(songCard.getByTestId('song-container')).toBeEmptyDOMElement();
  });

  it('Should contain correct navigate link URL', () => {
    mockedUseSelector
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(false);
    const songCard = render(
      <BrowserRouter>
        <SongCard
          {...mockedSongData} />
      </BrowserRouter>);
    expect(songCard.getByRole('link').outerHTML).toContain('artists/1z4g3DjTBBZKhvAroFlhOM');
  });

  it('Should dispatch actions on play button -- not playing, no current song', () => {
    const dispatch = jest.fn();
    mockedUseDispatch.mockReturnValueOnce(dispatch);

    mockedUseSelector
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(false);

    const songCard = render(
      <BrowserRouter>
        <SongCard
          {...mockedSongData} />
      </BrowserRouter>);

    userEvent.click(songCard.getByRole('play-button'));
    expect(dispatch).toHaveBeenCalledTimes(4);
    expect(mockedSetCurrentSong).toHaveBeenCalledWith(mockedSongData);
    expect(mockedSetPreviousSong).toHaveBeenCalled();
    expect(mockedSetSongsCollectionType).toHaveBeenCalledWith('songs');
    expect(mockedSetIsPlaying).toHaveBeenCalled();
  });

  it('Should dispatch actions on play button -- playing, set current song', () => {
    const dispatch = jest.fn();
    mockedUseDispatch.mockReturnValueOnce(dispatch);

    mockedUseSelector
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(mockedSongData)
      .mockReturnValueOnce(false);

    const songCard = render(
      <BrowserRouter>
        <SongCard
          {...mockedSecondSong} />
      </BrowserRouter>);

    userEvent.click(songCard.getByRole('play-button'));
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(mockedSetCurrentSong).toHaveBeenCalledWith(mockedSecondSong);
    expect(mockedSetPreviousSong).toHaveBeenCalledWith(mockedSongData);
    expect(mockedSetSongsCollectionType).toHaveBeenCalledWith('songs');
    expect(mockedSetIsPlaying).not.toHaveBeenCalled();
  });

  it('Should only dispatch play action on similar songs', () => {
    const dispatch = jest.fn();
    mockedUseDispatch.mockReturnValueOnce(dispatch);

    mockedUseSelector
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(mockedSongData)
      .mockReturnValueOnce(false);

    const songCard = render(
      <BrowserRouter>
        <SongCard
          {...mockedSongData} />
      </BrowserRouter>);

    userEvent.click(songCard.getByRole('play-button'));
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(mockedSetIsPlaying).toHaveBeenCalled();
  });


  it('Should render \'play\' icon while paused and then \'pause\' icon', () => {
    const dispatch = jest.fn();
    mockedUseDispatch.mockReturnValueOnce(dispatch);

    mockedUseSelector
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(mockedSongData)
      .mockReturnValueOnce(false);

    const songCard = render(
      <BrowserRouter>
        <SongCard
          {...mockedSongData} />
      </BrowserRouter>);

    expect(songCard.getByTestId('play-icon')).toBeInTheDocument();
    userEvent.click(songCard.getByRole('play-button'));

    mockedUseSelector
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(mockedSongData)
      .mockReturnValueOnce(false);

    expect(songCard.getByTestId('play-icon')).toBeInTheDocument();
  });
});
