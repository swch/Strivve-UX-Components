import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { APIFilter, CardBody, CardholderBody, JobBody, MerchantSite, PostCredsBody, StrivveServiceInterface } from '../../types';
import StrivveCore from '../../core/core';
import StrivveComponent from '../component';

const merchantSite: MerchantSite = {
  id: "123456789",
  name: "Mock Merchant",
  note: "This is a mock merchant site",
  host: "www.mockmerchant.com",
  tags: ["e-commerce", "retail"],
  interface_type: "web",
  job_type: "full-time",
  required_form_fields: ["name", "email", "address"],
  images: [
    {
      url: "https://www.mockmerchant.com/logo.png",
      width: 200,
      grayscale: false,
    },
    {
      url: "https://www.mockmerchant.com/banner.jpg",
      width: 800,
      grayscale: true,
    },
  ],
  account_link: [
    {
      key_name: "username",
      label: "Username",
      type: "text",
      secret: false,
    },
    {
      key_name: "password",
      label: "Password",
      type: "password",
      secret: true,
    },
  ],
  messages: {
    mfa_label: "MFA Code",
    additional_info_message: "Please provide additional information",
    auth_message: "Authentication required",
  },
  script_directory: "/scripts",
  record_final_site_artifacts: true,
  puppeteer_screenshot: true,
  login_page: "/login",
  forgot_password_page: "/forgot-password",
  credit_card_page: "/credit-card",
  wallet_page: "/wallet",
  merchant_sso_group: "MockSSOGroup",
  tier: 2,
};

class Service implements StrivveServiceInterface {

  getMerchantSites(filters?: APIFilter | undefined): Promise<MerchantSite[]> {
    return Promise.resolve([merchantSite])
  }

  async getMerchantSite(id: string): Promise<MerchantSite | undefined> {
    const data = await this.getMerchantSites();
    return data[0];
  }

  createJobs(data: JobBody[]): Promise<any> {
    return Promise.resolve()
  }

  createCardholder(body: CardholderBody): Promise<any> {
    return Promise.resolve()
  }

  createCardholderQuery(id: string) {
    return Promise.resolve()
  }

  createCard(data: CardBody): Promise<any> {
    return Promise.resolve()
  }

  authorizeCardholder(data: any): Promise<any> {
    return Promise.resolve()
  }

  setSafeKey(key: string): void {

  }

  postCreds(body: PostCredsBody): Promise<any> {
    return Promise.resolve()
  }
}

describe("StrivveComponent", () => {
  beforeEach(async () => {
    const service = new Service()
    const core = new StrivveCore({
      service,
      card: {
        pan: '4111111111111111',
        cvv: '321',
        expiration_month: '02',
        expiration_year: '24',
        name_on_card: 'Mvick',
      },
    })

    const component = new StrivveComponent({ core });

    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<div id="linking" />);

    component.mountLinkingJourney("linking", {});

    const element: HTMLInputElement = await screen.findByTestId('loader');
    expect(element).toBeInTheDocument();

    const selectSiteView: HTMLDivElement = await screen.findByTestId('selectSiteView');
    expect(selectSiteView).toBeInTheDocument();

    const selectSiteItem: HTMLDivElement = await screen.findByTestId(`selectSiteItem-${merchantSite.id}`);
    fireEvent.click(selectSiteItem);

    expect(selectSiteItem).toHaveAttribute('aria-selected', 'true');

    const continueButton = await screen.findByTestId(`continue`);

    fireEvent.click(continueButton);

    const accountLinkView: HTMLInputElement = await screen.findByTestId('accountLinkView');
    expect(accountLinkView).toBeInTheDocument();
  });

  test('mountLinkingJourney', async () => {
    const accountLinkView: HTMLInputElement = await screen.findByTestId('accountLinkView');
    expect(accountLinkView).toHaveClass('accountLinkView');
  });
})