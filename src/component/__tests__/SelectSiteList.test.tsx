import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import SelectSiteList from '../SelectSiteList';
import { MerchantSite } from '../../types';

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


describe("SelectSiteList", () => {
  test('render SelectSiteList', () => {
    render(
      <SelectSiteList
        sites={[
          merchantSite
        ]}
        selected={[]}
        onSelectItem={() => {}}
      />
    );
    const element: HTMLDivElement = screen.getByTestId('selectSiteList');
    expect(element).toBeInTheDocument();

    const item: HTMLDivElement = screen.getByTestId(`selectSiteItem-${merchantSite.id}`);
    expect(item).toBeInTheDocument();

    const name: HTMLDivElement = screen.getByText(merchantSite.name);
    expect(name).toBeInTheDocument();
  });
})