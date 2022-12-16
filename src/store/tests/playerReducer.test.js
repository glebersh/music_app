import playerReducer, {
  setSongsCollection,
  setSongsCollectionType,
  setIsPlaying,
  setIsPlayingTrue,
  setCurrentSong,
  setPreviousSong
} from '../slices/playerSlice';

const initialState = {
  songsCollection: {},
  songsCollectionType: 'songs',
  isPlaying: false,
  currentSong: {},
  previousSong: {},
  nextSong: {},
  loadingStatus: '',
  errorStatus: null,
};

const mockedSongsData = {
  songsCollection: { tracks: [{ name: 'Weekend', artist: 'Taeyeon', duration_ms: 244000 }] },
  songsCollectionType: 'album',
  isPlaying: true,
  currentSong: { name: 'Weekend', artist: 'Taeyeon', duration_ms: 244000 },
  previousSong: { name: 'Psycho', artist: 'Red Velvet', duration_ms: 276300 },
};

describe('Player Reducer tests', () => {
  it('Should return initial state on empty action', () => {
    const result = playerReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('Should set playlist data on setSongsCollection action', () => {
    const action = {
      type: setSongsCollection.type,
      payload: mockedSongsData.songsCollection,
    };
    const actionResult = playerReducer(initialState, action);
    expect(actionResult.songsCollection).toEqual(mockedSongsData.songsCollection);
    expect(actionResult.loadingStatus).toEqual('resolved');
  });

  it('Should set playlist type on setSongsCollectionType action', () => {
    const action = {
      type: setSongsCollectionType.type,
      payload: mockedSongsData.songsCollectionType,
    };
    const actionResult = playerReducer(initialState, action);
    expect(actionResult.songsCollectionType).toEqual('album');
  });

  it('Should set isPlaying to true on setIsPlaying action', () => {
    const action = {
      type: setIsPlaying.type,
      payload: !initialState.isPlaying,
    };
    const actionResult = playerReducer(initialState, action);
    expect(actionResult.isPlaying).toBe(true);
  });

  it('Should set isPlaying to true on setIsPlayingTrue action', () => {
    const action = {
      type: setIsPlayingTrue.type
    };
    const actionResult = playerReducer(initialState, action);
    expect(actionResult.isPlaying).toBe(true);
  });

  it('Should set current song on setCurrentSong action', () => {
    const action = {
      type: setCurrentSong.type,
      payload: mockedSongsData.currentSong
    };
    const actionResult = playerReducer(initialState, action);
    expect(actionResult.currentSong).toEqual(mockedSongsData.currentSong);
    expect(actionResult.currentSong.name).toEqual('Weekend');
    expect(actionResult.currentSong.artist).toEqual('Taeyeon');
    expect(actionResult.currentSong.duration_ms).toEqual(244000);
  });

  it('Should set previous song on setPreviousSong action', () => {
    const action = {
      type: setPreviousSong.type,
      payload: mockedSongsData.previousSong
    };
    const actionResult = playerReducer(initialState, action);
    expect(actionResult.previousSong).toEqual(mockedSongsData.previousSong);
    expect(actionResult.previousSong.name).toEqual('Psycho');
    expect(actionResult.previousSong.artist).toEqual('Red Velvet');
    expect(actionResult.previousSong.duration_ms).toEqual(276300);
  });


});
