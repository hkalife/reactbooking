import React from 'react';
import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Bookings from '../../src/views/Bookings';
import { describe, it, expect } from 'vitest';

const mockStore = configureStore({ reducer: { bookings: () => [] } });

describe('Bookings Component', () => {
  render(
    <Provider store={mockStore}>
      <Bookings />
    </Provider>
  );

  it('should render component', () => {
    expect(screen.getByTestId('dynamic__component')).toBeTruthy();
    expect(screen.getByTestId('schedule__screen')).toBeTruthy();
  });

  it('should change screens correctly', () => {
    const buttonElement = screen.getByTestId('button__navbar--listing');
    fireEvent.click(buttonElement);

    expect(screen.getByTestId('listing__screen')).toBeTruthy();
  });
});
