import SongsList from "./SongsList";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

import * as reduxHooks from 'react-redux';
import { BrowserRouter } from "react-router-dom";

jest.mock('react-redux');
const mockedUseSelector = jest.spyOn(reduxHooks, 'useSelector');
const mockedUseDispatch = jest.spyOn(reduxHooks, 'useDispatch');

const mockedData = [
  {
    album: {
      album_type: 'album',
      artists: [
        {
          id: '1z4g3DjTBBZKhvAroFlhOM',
          name: 'Red Velvet',
        }
      ],
      id: '3rVtm00UfbuzWOewdm4iYM',
      images: [
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d00004851df5022bdf1ac4bf52135c4be',
          width: 64
        }
      ],
      name: '‘The ReVe Festival’ Finale',
    },
    artists: [
      {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/1z4g3DjTBBZKhvAroFlhOM'
        },
        id: '1z4g3DjTBBZKhvAroFlhOM',
        name: 'Red Velvet',
      }
    ],
    duration_ms: 210560,
    explicit: false,
    href: 'https://api.spotify.com/v1/tracks/3CYH422oy1cZNoo0GTG1TK',
    id: '3CYH422oy1cZNoo0GTG1TK',
    name: 'Psycho',
    preview_url: 'https://p.scdn.co/mp3-preview/786146ba24ff84e70da6021c141b1ddd843a6fc0?cid=ea5fd0d4cfe147699b87b05db7e6f7bb',
  },
  {
    album: {
      album_type: 'album',
      artists: [
        {
          id: '1z4g3DjTBBZKhvAroFlhOM',
          name: 'Red Velvet',
        }
      ],
      id: '6MNlcai3skKLKv5syzFwC3',
      images: [
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d000048513f30a062dafcdbc1a8fad842',
          width: 64
        }
      ],
      name: 'Russian Roulette - The 3rd Mini Album',
    },
    artists: [
      {
        id: '1z4g3DjTBBZKhvAroFlhOM',
        name: 'Red Velvet',
      }
    ],
    duration_ms: 211243,
    explicit: false,
    id: '5HiSc2ZCGn8L3cH3qSwzBT',
    name: '러시안 룰렛 Russian Roulette',
    preview_url: 'https://p.scdn.co/mp3-preview/4bcebb26f081af2193258ec4dcef59a97a8dad34?cid=ea5fd0d4cfe147699b87b05db7e6f7bb',
  }];

describe('Song list tests', () => {
  it('Should render and match snapshot if loading is \'resovled\'', () => {
    mockedUseSelector
      .mockReturnValueOnce(mockedData)
      .mockReturnValueOnce('resolved')
      .mockReturnValueOnce(null);

    const songsList = render(
      <BrowserRouter>
        <SongsList />
      </BrowserRouter>);
    expect(songsList).toMatchSnapshot();
  });

  it('If loading is \'loading\' should render spinner', () => {
    mockedUseSelector
      .mockReturnValueOnce(mockedData)
      .mockReturnValueOnce('loading')
      .mockReturnValueOnce(null);

    const songsList = render(
      <BrowserRouter>
        <SongsList />
      </BrowserRouter>);
    expect(songsList.getByRole('spinner')).toBeInTheDocument();
  });

  it('Should render alert if error', () => {
    mockedUseSelector
      .mockReturnValueOnce(mockedData)
      .mockReturnValueOnce('resolved')
      .mockReturnValueOnce(true);

    const songsList = render(
      <BrowserRouter>
        <SongsList />
      </BrowserRouter>);
    expect(songsList.getByRole('error-alert')).toBeInTheDocument();
  });
});