import SongCollectionCard from "./SongCollectionCard";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

import * as reduxHooks from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import * as actions from '../../store/slices/playerSlice';
import { mockedSongData } from "../SongCard/SongCard.test";
import { mockedAlbumData, mockedPlaylistData } from "../SongCollectionsList/SongCollectionList.test";

jest.mock('../../store/slices/playerSlice');
const mockedSetPreviousSong = jest.spyOn(actions, 'setPreviousSong');
const mockedGetSongCollectionTracks = jest.spyOn(actions, 'getSongCollectionTracks');

jest.mock('react-redux');
const mockedUseSelector = jest.spyOn(reduxHooks, 'useSelector');
const mockedUseDispatch = jest.spyOn(reduxHooks, 'useDispatch');



describe('Song collection card tests', () => {
  it('Should render and match snapshot if loading is ended', () => {
    mockedUseSelector.mockReturnValue(mockedSongData);
    const dispatch = jest.fn();
    mockedUseDispatch.mockReturnValue(dispatch);

    const albumCard = render(
      <BrowserRouter>
        <SongCollectionCard
          collectionType='ALBUMS'
          {...mockedAlbumData[0]} />
      </BrowserRouter>);
    expect(albumCard).toMatchSnapshot();
  });

  it('Should dispatch actions if album', () => {
    mockedUseSelector.mockReturnValue(mockedSongData);
    const dispatch = jest.fn();
    mockedUseDispatch.mockReturnValue(dispatch);

    const albumCard = render(
      <BrowserRouter>
        <SongCollectionCard
          collectionType='ALBUMS'
          {...mockedAlbumData[0]} />
      </BrowserRouter>);
    userEvent.click(albumCard.getByTestId('album-container'));

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(mockedSetPreviousSong).toHaveBeenCalledWith(mockedSongData);
    expect(mockedGetSongCollectionTracks).toHaveBeenCalledWith(
      {
        id: '58OR7UoaJkJzqeQGClHzh1',
        playlistType: 'albums'
      });
  });

  it('Should render and dispatch actions if playlist', () => {
    mockedUseSelector.mockReturnValue(mockedSongData);
    const dispatch = jest.fn();
    mockedUseDispatch.mockReturnValue(dispatch);

    const albumCard = render(
      <BrowserRouter>
        <SongCollectionCard
          collectionType='PLAYLISTS'
          {...mockedPlaylistData[0]} />
      </BrowserRouter>);
    userEvent.click(albumCard.getByTestId('album-container'));

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(mockedSetPreviousSong).toHaveBeenCalledWith(mockedSongData);
    expect(mockedGetSongCollectionTracks).toHaveBeenCalledWith(
      {
        id: '111Tmphrp0a1xc4RmTvLkw',
        playlistType: 'playlists'
      });
  });
});