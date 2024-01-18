import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Modal } from '../../src/components';
import { describe, it, expect } from 'vitest';
import { ModalTypes } from '../../src/enums';

const mockStore = configureStore({ reducer: { bookings: () => [] } });

const modalConfig = {
  type: ModalTypes.WARNING,
  icon: ModalTypes.WARNING,
  title: 'Title',
  description: 'Description',
}

describe('Modal Component', () => {
  render(
    <Provider store={mockStore}>
      <Modal
        type={modalConfig.type}
        icon={modalConfig.icon}
        title={modalConfig.title}
        description={modalConfig.description}
        onClickConfirm={() => {}}
        openModal={true}
      />
    </Provider>
  );

  it('should be visible', () => {
    expect(screen.getByTestId('modal__component')).toBeTruthy();
  });

  it('should render title and description', () => {
    expect(screen.getByText(modalConfig.title)).toBeTruthy();
    expect(screen.getByText(modalConfig.description)).toBeTruthy();
  });

  it('should render its type', () => {
    expect(screen.getByTestId('icon__modal--warning')).toBeTruthy();
  });
});
