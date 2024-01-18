import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Schedule } from '../../src/components';
import { describe, it, expect } from 'vitest';

const mockStore = configureStore({ reducer: { bookings: () => [] } });

describe('Schedule Component', () => {
  render(
    <Provider store={mockStore}>
      <Schedule />
    </Provider>
  );

  it('should render component', () => {
    expect(screen.getByTestId('schedule__screen')).toBeTruthy();
  });

  it('should render the date input fields and confirm button', () => {
    expect(
      screen.getByTestId('checkin__field')
      && screen.getByTestId('checkout__field')
      && screen.getByTestId('dates__confirm--btn')
    ).toBeTruthy();
  });
});
