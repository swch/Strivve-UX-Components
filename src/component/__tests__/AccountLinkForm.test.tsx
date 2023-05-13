import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import AccountLinkForm from '../AccountLinkForm';
import userEvent from '@testing-library/user-event';

describe("AccountLinkForm", () => {
  test('render AccountLinkForm', () => {
    render(
      <AccountLinkForm
        fields={[
          { name: 'email', type: 'email', value: '', required: true }
        ]}
        submit={() => {

        }}
        change={() => {

        }}
      />
    );

    const element: HTMLInputElement = screen.getByTestId('input');

    expect(element).toBeInTheDocument();
    expect(element.name).toBe('email');
    expect(element.type).toBe('email');
    expect(element.required).toBe(true);
  });

  test('change value', () => {
    let data = '';
    render(
      <AccountLinkForm
        fields={[
          { name: 'email', type: 'email', value: '', required: true }
        ]}
        submit={() => {

        }}
        change={(name, value) => {
          data = value;
        }}
      />
    );
    
    const element: HTMLInputElement = screen.getByTestId('input');
    const email = 'tes@gmail.com';
    userEvent.type(element, email);
    expect(element.value).toBe(email);
    expect(data).toBe(email);
  });
})