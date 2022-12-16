import artistInfoReducer, {
  setArtist, setArtistTopTracks, setArtistTopAlbums
} from '../slices/artistInfoSlice';

const initialState = {
  artistInfo: {},
  artistTopTracks: {},
  artistTopAlbums: {},
  loadingStatus: '',
  errorStatus: null,
};

export const mockedArtistData = {
  artistInfo: { name: 'Jimi Hendrix' },
  artistTopTracks: {
    tracks: [{
      name: 'Purple Haze',
      duration_ms: 240800,
      genre: 'classic rock'
    }]
  },
  artistTopAlbums: {
    albums: [{
      name: 'Los Angeles Forum - April 26, 1969 (Live)',
      total_tracks: 11
    }]
  },
  loadingStatus: '',
  errorStatus: null,
};

describe('Artist Info Reducer tests', () => {
  it('Should return initial state on empty action', () => {
    const result = artistInfoReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('Should set data on setArtist action', () => {
    const action = {
      type: setArtist.type,
      payload: mockedArtistData.artistInfo,
    };
    const actionResult = artistInfoReducer(initialState, action);

    expect(actionResult.artistInfo).toEqual(mockedArtistData.artistInfo);
    expect(actionResult.artistInfo.name).toEqual('Jimi Hendrix');
  });

  it('Should set data on setArtistTopTracks action', () => {
    const action = {
      type: setArtistTopTracks.type,
      payload: mockedArtistData.artistTopTracks,
    };
    const actionResult = artistInfoReducer(initialState, action);

    expect(actionResult.artistTopTracks).toEqual(mockedArtistData.artistTopTracks);
    expect(actionResult.artistTopTracks.tracks[0].genre).toEqual('classic rock');
  });

  it('Should set data on setArtistTopAlbums action', () => {
    const action = {
      type: setArtistTopAlbums.type,
      payload: mockedArtistData.artistTopAlbums,
    };
    const actionResult = artistInfoReducer(initialState, action);

    expect(actionResult.artistTopAlbums).toEqual(mockedArtistData.artistTopAlbums);
    expect(actionResult.artistTopAlbums.albums[0].total_tracks).toEqual(11);
  });
});
