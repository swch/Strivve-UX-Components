import '@testing-library/jest-dom';
import 'matchmedia-polyfill';
import 'matchmedia-polyfill/matchMedia.addListener';
import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import {
  APIFilter,
  CardBody,
  CardholderBody,
  JobBody,
  MerchantSite,
  PostCredsBody,
  StrivveServiceInterface,
} from '../../types';
import StrivveCore from '../../core/strivveCore';
import StrivveComponent from '../component';
import { StrivveService, merchantSite } from '../testHelper';

class ErrorService implements StrivveServiceInterface {
  safe_key: string = '123';
  getMerchantSites(filters?: APIFilter | undefined): Promise<MerchantSite[]> {
    throw new Error('Failed');
  }

  async getMerchantSite(id: string): Promise<MerchantSite | undefined> {
    throw new Error('Failed');
  }

  init(): Promise<boolean> {
    return Promise.resolve(true);
  }

  cancelJob(id: number): Promise<boolean> {
    return Promise.resolve(true);
  }

  createJobs(data: JobBody[]): Promise<any> {
    return Promise.resolve();
  }

  createCardholder(body: CardholderBody): Promise<any> {
    return Promise.resolve();
  }

  createCardholderQuery(id: string) {
    return Promise.resolve();
  }

  createCard(data: CardBody): Promise<any> {
    return Promise.resolve();
  }

  authorizeCardholder(data: any): Promise<any> {
    return Promise.resolve();
  }

  setSafeKey(key: string): void {}

  postCreds(body: PostCredsBody): Promise<any> {
    return Promise.resolve();
  }
}

describe('mountLinkingJourney', () => {
  test('Successfully rendered', async () => {
    const service = new StrivveService({ api_instance: 'test' });
    const core = new StrivveCore({
      service,
      card: {
        pan: '4111111111111111',
        cvv: '321',
        expiration_month: '2',
        expiration_year: '24',
        name_on_card: 'Mvick',
      },
    });

    const component = new StrivveComponent({ core });

    render(<div id="linking" />);

    act(() => {
      component.mountLinkingJourney('linking', {
        selectSiteOptions: {
          view: 'list',
        },
      });
    });

    const element: HTMLInputElement = await screen.findByTestId('loader');
    expect(element).toBeInTheDocument();

    const selectSiteView: HTMLDivElement = await screen.findByTestId(
      'selectSiteView'
    );
    expect(selectSiteView).toBeInTheDocument();
  });

  test('Failed rendered', async () => {
    const service = new ErrorService();
    const core = new StrivveCore({
      service,
      card: {
        pan: '4111111111111111',
        cvv: '321',
        expiration_month: '2',
        expiration_year: '24',
        name_on_card: 'Mvick',
      },
    });

    const component = new StrivveComponent({ core });

    render(<div id="linking" />);

    act(() => {
      component.mountLinkingJourney('linking', {});
    });

    const selectSiteView: HTMLDivElement = await screen.findByTestId(
      'selectSiteView'
    );

    expect(selectSiteView).toBeInTheDocument();

    const selectSiteErrorMessage: HTMLDivElement = await screen.findByTestId(
      'selectSiteErrorMessage'
    );
    expect(selectSiteErrorMessage).toBeInTheDocument();
  });
});

describe('mountAccountLinkView', () => {
  test('Mount and unmount', async () => {
    const service = new StrivveService({ api_instance: 'test' });
    const core = new StrivveCore({
      service,
      card: {
        pan: '4111111111111111',
        cvv: '321',
        expiration_month: '2',
        expiration_year: '24',
        name_on_card: 'Mvick',
      },
    });

    const component = new StrivveComponent({ core });

    render(<div id="linking" />);

    act(() => {
      component.mountAccountLinkView('linking', { site_id: '1' });
    });

    const element: HTMLInputElement = await screen.findByTestId('loader');
    expect(element).toBeInTheDocument();

    const accountLinkView: HTMLInputElement = await screen.findByTestId(
      'accountLinkView'
    );
    expect(accountLinkView).toBeInTheDocument();

    act(() => {
      component.unmountAccountLinkView('linking');
    });

    expect(screen.queryByTestId('accountLinkView')).not.toBeInTheDocument();
  });
});

describe('mountSelectSiteView', () => {
  test('Mount and unmount', async () => {
    const service = new StrivveService({ api_instance: 'test' });
    const core = new StrivveCore({
      service,
      card: {
        pan: '4111111111111111',
        cvv: '321',
        expiration_month: '2',
        expiration_year: '24',
        name_on_card: 'Mvick',
      },
    });

    const component = new StrivveComponent({ core });

    render(<div id="linking" />);

    act(() => {
      component.mountSelectSiteView('linking', {});
    });

    const element: HTMLInputElement = await screen.findByTestId('loader');
    expect(element).toBeInTheDocument();

    const selectSiteView: HTMLInputElement = await screen.findByTestId(
      'selectSiteView'
    );
    expect(selectSiteView).toBeInTheDocument();
    act(() => {
      component.unmountSelectSiteView('linking');
    });

    expect(screen.queryByTestId('selectSiteView')).not.toBeInTheDocument();
  });
});
