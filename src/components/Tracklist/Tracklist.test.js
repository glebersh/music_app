import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import Tracklist from "./Tracklist";

import * as reduxHooks from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { mockedAlbumData } from "../SongCollectionsList/SongCollectionList.test";

jest.mock('react-redux');
const mockedUseSelector = jest.spyOn(reduxHooks, 'useSelector');
const mockedUseDispatch = jest.spyOn(reduxHooks, 'useDispatch');

describe('Tracklist test', () => {
  it('Should render and match snapshot if loading is done', () => {
    mockedUseSelector
      .mockReturnValueOnce(mockedAlbumData)
      .mockReturnValueOnce('album')
      .mockReturnValueOnce('resolved')
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(null);

    const tracklist = render(<Tracklist />);
    expect(tracklist).toMatchSnapshot();
  });

  it('Should render spinner if loading', () => {
    mockedUseSelector
      .mockReturnValueOnce(mockedAlbumData)
      .mockReturnValueOnce('album')
      .mockReturnValueOnce('loading')
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(null);

    const tracklist = render(<Tracklist />);
    expect(tracklist.getByRole('spinner')).toBeInTheDocument();
  });

  it('Should render alert if error', () => {
    mockedUseSelector
      .mockReturnValueOnce(mockedAlbumData)
      .mockReturnValueOnce('album')
      .mockReturnValueOnce('resolved')
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(null);

    const tracklist = render(<Tracklist />);
    expect(tracklist.getByRole('error-alert')).toBeInTheDocument();
  });
});