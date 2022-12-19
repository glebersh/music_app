import { render } from "@testing-library/react"
import Footer from "./Footer"
import '@testing-library/jest-dom';
import * as AudioPlayer from '../AudioPlayer/AudioPlayer';
import * as reduxHooks from 'react-redux';
import React from "react";

jest.mock('react-redux');
const mockedUseSelector = jest.spyOn(reduxHooks, 'useSelector');

jest.mock('../AudioPlayer/AudioPlayer', () => () => (
  <div>Audio Player with no functionality</div>
));


describe('Footer list tests', () => {
  it('Should render and match snapshot', () => {
    const footer = render(<Footer />);
    expect(footer).toMatchSnapshot();
  });
});