import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import * as reduxHooks from 'react-redux';
import Search from './Search';
import * as searchActions from '../../store/slices/searchSlice';
import * as routerHooks from 'react-router-dom';

jest.mock('react-redux');
const mockUseDispatch = jest.spyOn(reduxHooks, 'useDispatch');
const mockedUseSelector = jest.spyOn(reduxHooks, 'useSelector');

jest.mock('react-router-dom');
const mockedUsedNavigate = jest.spyOn(routerHooks, 'useNavigate');

jest.mock('../../store/slices/searchSlice');
const mockedChangeCategory = jest.spyOn(searchActions, 'onCategoryChange');
const mockedGetDataFromSearch = jest.spyOn(searchActions, 'getDataFromSearch');

describe('Searchbar tests', () => {
  it('Should render and match snapshot', () => {
    const dispatch = jest.fn();
    mockUseDispatch.mockReturnValue(dispatch);
    const searchbar = render(<Search />);
    expect(searchbar).toMatchSnapshot();
  });

  it('Should dispatch action on tag click', () => {
    const dispatch = jest.fn();
    mockUseDispatch.mockReturnValue(dispatch);

    const searchbar = render(<Search />);

    userEvent.click(searchbar.getAllByRole('search-filter-button')[1]);
    expect(mockedChangeCategory).toHaveBeenCalledWith('songs');

    userEvent.click(searchbar.getAllByRole('search-filter-button')[2]);
    expect(mockedChangeCategory).toHaveBeenCalledWith('albums');

    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it('Should submit form', () => {
    const dispatch = jest.fn();
    mockUseDispatch.mockReturnValue(dispatch);
    const navigate = jest.fn();
    mockedUsedNavigate.mockReturnValue(navigate);

    const searchbar = render(<Search />);
    userEvent.type(searchbar.getByRole('search'), 'Red velvet');
    userEvent.click(searchbar.getByRole('search-submit-button'));

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(mockedChangeCategory).toHaveBeenCalledWith('multi');
    expect(mockedGetDataFromSearch).toHaveBeenCalledWith('Red%20velvet');
    // expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
  });
});