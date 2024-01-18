import React from 'react';
import { render, screen } from '@testing-library/react';
import { Modal } from '../../src/components';
import { describe, it, expect } from 'vitest';
import { ModalTypes } from '../../src/enums';

const modalConfig = {
  type: ModalTypes.WARNING,
  icon: ModalTypes.WARNING,
  title: 'Title',
  description: 'Description',
}

describe('Modal Component', () => {
  render(
    <Modal
      type={modalConfig.type}
      icon={modalConfig.icon}
      title={modalConfig.title}
      description={modalConfig.description}
      onClickConfirm={() => {}}
      openModal={true}
    />
  );

  it('should be visible', () => {
    expect(screen.getByTestId('modal__component')).toBeTruthy();
  });

  it('should render title and description', () => {
    expect(
      screen.getByText(modalConfig.title)
      && screen.getByText(modalConfig.description)
    ).toBeTruthy();
  });

  it('should render its type', () => {
    expect(screen.getByTestId('icon__modal--warning')).toBeTruthy();
  });
});
