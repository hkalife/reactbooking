import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Listing } from '../../src/components';
import { describe, it, expect } from 'vitest';

const createMockStore = (initialState) => configureStore({ reducer: { bookings: () => initialState } });

describe('Listing Component', () => {
  let mockStore = createMockStore([]);

  it('should render component', () => {
    render(
      <Provider store={mockStore}>
        <Listing />
      </Provider>
    );
    expect(screen.getByTestId('listing__screen')).toBeTruthy();
  });

  it('should render without bookings', () => {
    expect(screen.getByText('no_bookings')).toBeTruthy();
  });

  it('should render with bookings', () => {
    cleanup()
    mockStore = createMockStore([{ id: 1, beginDate: '01-01-2024', endDate: '01-02-2024' }]);

    render(
      <Provider store={mockStore}>
        <Listing />
      </Provider>
    );
    
    expect(screen.getByTestId('listing__result--0')).toBeTruthy();
  });
});
