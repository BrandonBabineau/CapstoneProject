import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  it('renders the home page', () => {
    const { getByText, getByAltText } = render(<Home />);
    const headingElement = getByText('AvenueMart');
    const imageElement = getByAltText('Example');

    expect(headingElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
  });
});
