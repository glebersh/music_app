import searchReducer, {
  onSearch, onCategoryChange
} from '../slices/searchSlice';
import { mockedArtistData } from './artistInfoReducer.test';

const initialState = {
  searchResult: {},
  searchCategory: 'multi',
  loadingStatus: '',
  errorStatus: null,
};


describe('Search Reducer tests', () => {
  it('Should return initial state on empty action', () => {
    const result = searchReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('Should set search result data on onSearch action', () => {
    const action = {
      type: onSearch.type,
      payload: mockedArtistData,
    };
    const actionResult = searchReducer(initialState, action);
    expect(actionResult.searchResult).toEqual(mockedArtistData);
  });

  it('Should change category on onCategoryChange action', () => {
    const action = {
      type: onCategoryChange.type,
      payload: 'albums',
    };
    const actionResult = searchReducer(initialState, action);
    expect(actionResult.searchCategory).toEqual('albums');
  });
});
