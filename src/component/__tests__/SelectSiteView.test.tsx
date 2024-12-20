import '@testing-library/jest-dom';
import 'matchmedia-polyfill';
import 'matchmedia-polyfill/matchMedia.addListener';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SelectSiteView from '../SelectSiteView';
import {
  APIFilter,
  CardBody, Cardholder,
  CardholderBody,
  JobBody,
  MerchantSite,
  PostCredsBody, StrivveResponse,
  StrivveServiceInterface,
} from '../../types';
import StrivveCore from '../../core/strivveCore';

const merchantSite: MerchantSite = {
  id: '123456789',
  name: 'Mock Merchant',
  note: 'This is a mock merchant site',
  host: 'www.mockmerchant.com',
  tags: ['e-commerce', 'retail'],
  interface_type: 'web',
  job_type: 'full-time',
  required_form_fields: ['name', 'email', 'address'],
  images: [
    {
      url: 'https://www.mockmerchant.com/logo.png',
      width: 200,
      grayscale: false,
    },
    {
      url: 'https://www.mockmerchant.com/banner.jpg',
      width: 800,
      grayscale: true,
    },
  ],
  account_link: [
    {
      key_name: 'username',
      label: 'Username',
      type: 'text',
      secret: false,
    },
    {
      key_name: 'password',
      label: 'Password',
      type: 'password',
      secret: true,
    },
  ],
  messages: {
    mfa_label: 'MFA Code',
    additional_info_message: 'Please provide additional information',
    auth_message: 'Authentication required',
  },
  script_directory: '/scripts',
  record_final_site_artifacts: true,
  puppeteer_screenshot: true,
  login_page: '/login',
  forgot_password_page: '/forgot-password',
  credit_card_page: '/credit-card',
  wallet_page: '/wallet',
  merchant_sso_group: 'MockSSOGroup',
  tier: 2,
};

class Service implements StrivveServiceInterface {
  safe_key: string = '123';

  getMerchantSites(filters?: APIFilter | undefined): Promise<MerchantSite[]> {
    return Promise.resolve([merchantSite]);
  }

  async getMerchantSite(id: string): Promise<MerchantSite | undefined> {
    const data = await this.getMerchantSites();
    return data[0];
  }

  waitForLogin(): Promise<boolean> {
    return Promise.resolve(true);
  }

  cancelJob(id: number): Promise<boolean> {
    return Promise.resolve(true);
  }

  createJobs(data: JobBody[]): Promise<any> {
    return Promise.resolve();
  }

  getCardholder(id: number): Promise<any> {
    return Promise.resolve();
  }

  createCardholder(body: CardholderBody): Promise<any> {
    return Promise.resolve();
  }

  getCardholderQuery(id: string) {
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

  updateCard(card_id: string, body: any, safeKey: string): Promise<any>{
    return Promise.resolve();
  }

  getMissingCardDataFields(card_id: string, selected_sites: MerchantSite[]): Promise<any>{
    return Promise.resolve();
  }
}

describe('SelectSiteView', () => {
  test('render SelectSiteView', async () => {
    const service = new Service();
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

    render(
      <SelectSiteView
        options={{
          onSubmit: () => {},
          view: 'list',
        }}
        core={core}
        appearance={{}}
        localization={{}}
      />
    );

    const element: HTMLDivElement = screen.getByTestId('loader');
    expect(element).toBeInTheDocument();

    const selectSiteView: HTMLDivElement = await screen.findByTestId(
      'selectSiteView'
    );
    expect(selectSiteView).toBeInTheDocument();
  });
});
