import ArtistCard from "./ArtistCard";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

import * as reduxHooks from 'react-redux';
import { BrowserRouter } from "react-router-dom";
jest.mock('react-redux');
const mockedUseSelector = jest.spyOn(reduxHooks, 'useSelector');



describe('Artist Card test', () => {
  it('Should render and match snapshot when data loaded', () => {

    mockedUseSelector.mockReturnValue(true);
    const card = render(
      <BrowserRouter>
        <ArtistCard
          name='Red Velvet'
          imgURL='https://via.placeholder.com/300.png'
          artistID='1z4g3DjTBBZKhvAroFlhOM'
        />
      </BrowserRouter>);
    expect(card).toMatchSnapshot();
  });

  it('Should navigate to artist page on click', () => {

    mockedUseSelector.mockReturnValue(true);
    const card = render(
      <BrowserRouter>
        <ArtistCard
          name='Red Velvet'
          imgURL='https://via.placeholder.com/300.png'
          artistID='1z4g3DjTBBZKhvAroFlhOM'
        />
      </BrowserRouter>);
    expect(card.getByRole('link').outerHTML).toContain('artists/1z4g3DjTBBZKhvAroFlhOM');
  });

  it('Should not render if data not loaded', () => {

    mockedUseSelector.mockReturnValue('');
    const card = render(
      <BrowserRouter>
        <ArtistCard
          name='Red Velvet'
          imgURL='https://via.placeholder.com/300.png'
          artistID='1z4g3DjTBBZKhvAroFlhOM'
        />
      </BrowserRouter>);
    expect(card.getByTestId('artist-card')).toBeEmptyDOMElement();
  });
});