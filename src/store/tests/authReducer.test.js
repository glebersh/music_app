import authReducer, {
  setAuthToken
} from '../slices/authSlice';

const initialState = '';

describe('Authentification Reducer tests', () => {
  it('Should return initial state on empty action', () => {
    const result = authReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('Should set token on setAuthToken action', () => {
    const action = {
      type: setAuthToken.type,
      payload: '123irpWEefnm305Zmg',
    };
    const actionResult = authReducer(initialState, action);
    expect(actionResult).toEqual('123irpWEefnm305Zmg');
  });
});
