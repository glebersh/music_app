import { render } from "@testing-library/react"
import ArtistsList from "./ArtistsList"
import '@testing-library/jest-dom';

import * as reduxHooks from 'react-redux';
jest.mock('react-redux');
const mockedUseSelector = jest.spyOn(reduxHooks, 'useSelector');


const mockedArtistsData = [{
  name: 'Red Velvet',
  images: [{ url: 'https://via.placeholder.com/300.png' }],
  id: '1z4g3DjTBBZKhvAroFlhOM'
}];

describe('Artists list tests', () => {
  it('Should render if loading is done and no errors', () => {
    mockedUseSelector
      .mockReturnValueOnce(mockedArtistsData)
      .mockReturnValueOnce('resolved')
      .mockReturnValueOnce(false);

    const list = render(<ArtistsList />);
    expect(list.getByTestId('artist-card')).toBeInTheDocument();
  });

  it('Should match snapshot if loading is done and no errors', () => {
    mockedUseSelector
      .mockReturnValueOnce(mockedArtistsData)
      .mockReturnValueOnce('resolved')
      .mockReturnValueOnce(false);

    const list = render(<ArtistsList />);
    expect(list).toMatchSnapshot();
  });

  it('Should render spinner if loading', () => {
    mockedUseSelector
      .mockReturnValueOnce(mockedArtistsData)
      .mockReturnValueOnce('loading')
      .mockReturnValueOnce(false);

    const list = render(<ArtistsList />);
    expect(list.getByRole('spinner')).toBeInTheDocument();
  });

  it('Should render alert on error', () => {
    mockedUseSelector
      .mockReturnValueOnce(mockedArtistsData)
      .mockReturnValueOnce('resolved')
      .mockReturnValueOnce(true);

    const list = render(<ArtistsList />);
    expect(list.getByRole('error-alert')).toBeInTheDocument();
  });
});