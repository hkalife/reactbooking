import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Listing } from '../../src/components';
import { describe, it, expect } from 'vitest';

const mockStore = configureStore({ reducer: { bookings: () => [] } });

describe('Listing Component', () => {
  render(
    <Provider store={mockStore}>
      <Listing />
    </Provider>
  );

  it('should render component', () => {
    expect(screen.getByTestId('listing__screen')).toBeTruthy();
  });

  it('should render without bookings', () => {
    expect(screen.getByText('no_bookings')).toBeTruthy();
  });
});
