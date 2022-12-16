import { screen, render, within } from '@testing-library/react';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import * as reduxHooks from 'react-redux';
jest.mock('react-redux');
const mockedUseSelector = jest.spyOn(reduxHooks, 'useSelector');
const mockedUseDispatch = jest.spyOn(reduxHooks, 'useDispatch');


describe('App tests', () => {
  it('Should render login page if token is empty', () => {
    mockedUseSelector.mockReturnValue(false);
    const app = render(<App />);
    const LoginPage = within(app.getByTestId('app-container')).getByTestId('login-page-container');
    expect(LoginPage).toBeInTheDocument();
  });

  it('Should not render login page if token is set', () => {
    mockedUseSelector.mockReturnValue('122riDdjfZjgp3');
    const dispatch = jest.fn();
    mockedUseDispatch.mockReturnValue(dispatch);

    const app = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(app.getByTestId('app-container')).not.toBeEmptyDOMElement();
  });

  it('Should match snapshot', () => {
    mockedUseSelector.mockReturnValue('122riDdjfZjgp3');
    const dispatch = jest.fn();
    mockedUseDispatch.mockReturnValue(dispatch);

    const app = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(app).toMatchSnapshot();
  });
});