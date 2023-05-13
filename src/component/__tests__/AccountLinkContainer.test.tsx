import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import AccountLinkContainer from '../AccountLinkContainer';

describe("AccountLinkContainer", () => {
  test('render AccountLinkContainer', () => {
    render(
      <AccountLinkContainer>
        <div data-testid="children" />
      </AccountLinkContainer>
    );
    const element: HTMLDivElement = screen.getByTestId('children');

    expect(element).toBeInTheDocument();
  });

  test('hide title', async () => {
    render(
      <AccountLinkContainer
        hide_title
      >
        <div data-testid="children" />
      </AccountLinkContainer>
    );
    const element: HTMLDivElement | null = screen.queryByTestId('accountLinkHeader');

    expect(element).toBe(null);
  });

})