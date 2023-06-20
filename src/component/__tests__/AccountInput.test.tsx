import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import AccountInput from '../AccountInput';

describe('AccountInput', () => {
  test('render AccountInput', () => {
    render(<AccountInput id="email" name="email" onChange={() => {}} />);
    const element: HTMLInputElement = screen.getByTestId('email');

    expect(element).toBeInTheDocument();
  });

  test('show label', () => {
    render(
      <AccountInput name="email" onChange={() => {}} label="Your Email" />
    );
    const element: HTMLLabelElement = screen.getByTestId('label');

    expect(element).toBeInTheDocument();
    expect(element.textContent).toMatch('Your Email');
  });
});
