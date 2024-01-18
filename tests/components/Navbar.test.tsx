import React from 'react';
import { render, screen } from '@testing-library/react';
import { Navbar } from '../../src/components';
import { describe, it, expect } from 'vitest';

describe('Navbar Component', () => {
  render(
    <Navbar setScreen={() => {}} />
  );

  it('should render component and its buttons', () => {
    expect(
      screen.getByTestId('navbar__component')
      && screen.getByTestId('button__navbar--booking')
      && screen.getByTestId('button__navbar--listing')
    ).toBeTruthy();
  });
});
