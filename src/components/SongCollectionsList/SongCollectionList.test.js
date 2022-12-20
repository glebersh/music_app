import SongCollectionsList from "./SongCollectionsList";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

import * as reduxHooks from 'react-redux';
import { BrowserRouter } from "react-router-dom";

jest.mock('react-redux');
const mockedUseSelector = jest.spyOn(reduxHooks, 'useSelector');
const mockedUseDispatch = jest.spyOn(reduxHooks, 'useDispatch');

export const mockedAlbumData = [{
  artists: [
    {
      id: '1z4g3DjTBBZKhvAroFlhOM',
      name: 'Red Velvet',
    }
  ],
  id: '58OR7UoaJkJzqeQGClHzh1',
  images: [
    {
      height: 300,
      url: 'https://i.scdn.co/image/ab67616d00001e02d2ef237da7f94762997c2083',
      width: 300
    },
  ],
  name: '‘The ReVe Festival 2022 - Birthday’',
  total_tracks: 5,
  type: 'album',
  uri: 'spotify:album:58OR7UoaJkJzqeQGClHzh1'
}];

export const mockedPlaylistData = [{
  collaborative: false,
  description: 'SEULGI SOLO',
  external_urls: {
    spotify: 'https://open.spotify.com/playlist/111Tmphrp0a1xc4RmTvLkw'
  },
  href: 'https://api.spotify.com/v1/playlists/111Tmphrp0a1xc4RmTvLkw',
  id: '111Tmphrp0a1xc4RmTvLkw',
  images: [
    {
      height: null,
      url: 'https://i.scdn.co/image/ab67706c0000bebb3fdbcea2f13fd7327a178f7c',
      width: null
    }
  ],
  name: 'Red Velvet All Songs - In order',
  owner: {
    display_name: 'alejulula',
    external_urls: {
      spotify: 'https://open.spotify.com/user/ivf0a92xhjsa4upuwiewnbgs7'
    },
    href: 'https://api.spotify.com/v1/users/ivf0a92xhjsa4upuwiewnbgs7',
    id: 'ivf0a92xhjsa4upuwiewnbgs7',
    type: 'user',
    uri: 'spotify:user:ivf0a92xhjsa4upuwiewnbgs7'
  },
  primary_color: null,
  'public': null,
  snapshot_id: 'NzcsMTk5ZDJmNGY4NmRjNjFjN2NlYThlMWMyNmU0MDNhMGU1ZGJiMWRlYw==',
  tracks: {
    href: 'https://api.spotify.com/v1/playlists/111Tmphrp0a1xc4RmTvLkw/tracks',
    total: 149
  },
  type: 'playlist',
  uri: 'spotify:playlist:111Tmphrp0a1xc4RmTvLkw'
}];


describe('Song list tests', () => {
  it('Should render and match snapshot if loading is \'resovled\'', () => {
    mockedUseSelector
      .mockReturnValueOnce(mockedAlbumData)
      .mockReturnValueOnce('resolved')
      .mockReturnValueOnce(null);

    const songCollection = render(
      <BrowserRouter>
        <SongCollectionsList collectionType='ALBUMS' />
      </BrowserRouter>);
    expect(songCollection).toMatchSnapshot();
  });

  it('If loading is \'loading\' should render spinner', () => {
    mockedUseSelector
      .mockReturnValueOnce(mockedAlbumData)
      .mockReturnValueOnce('loading')
      .mockReturnValueOnce(null);

    const songCollection = render(
      <BrowserRouter>
        <SongCollectionsList collectionType='ALBUMS' />
      </BrowserRouter>);
    expect(songCollection.getByRole('spinner')).toBeInTheDocument();
  });

  it('Should render alert if error', () => {
    mockedUseSelector
      .mockReturnValueOnce(mockedAlbumData)
      .mockReturnValueOnce('resolved')
      .mockReturnValueOnce(true);

    const songCollection = render(
      <BrowserRouter>
        <SongCollectionsList collectionType='ALBUMS' />
      </BrowserRouter>);
    expect(songCollection.getByRole('error-alert')).toBeInTheDocument();
  });

  it('Should render if playlist', () => {
    mockedUseSelector
      .mockReturnValueOnce(mockedPlaylistData)
      .mockReturnValueOnce('resolved')
      .mockReturnValueOnce(false);

    const songCollection = render(
      <BrowserRouter>
        <SongCollectionsList collectionType='PLAYLISTS' />
      </BrowserRouter>);
    expect(songCollection.getByTestId('albums-list')).not.toBeEmptyDOMElement();
  });
});