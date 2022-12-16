import { render } from "@testing-library/react";
import Header from "./Header";
import '@testing-library/jest-dom';

import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import * as reduxHooks from 'react-redux';
jest.mock('react-redux');
const mockedUseDispatch = jest.spyOn(reduxHooks, 'useDispatch');

describe('Header test', () => {
  it('Should match snapshot', () => {
    const dispatch = jest.fn();
    mockedUseDispatch.mockReturnValue(dispatch);
    const header = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>);
    expect(header).toMatchSnapshot();
  });

  it('Should close alert on click event', () => {
    const dispatch = jest.fn();
    mockedUseDispatch.mockReturnValue(dispatch);
    const header = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>);
    userEvent.click(header.getByRole('alert-close-button'));
    expect(header.getByTestId('alert-toast')).not.toBeVisible();
  });
});