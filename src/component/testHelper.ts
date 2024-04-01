/* eslint-disable @typescript-eslint/no-useless-constructor */
import StrivveCore from '../core/strivveCore';
import {
  APIFilter,
  CardBody,
  CardholderBody,
  JobBody,
  MerchantSite,
  PostCredsBody,
  StrivveServiceInterface,
  StrivveServiceOptions,
} from '../types';

export const merchantSite: MerchantSite = {
  id: '123456789',
  name: 'Merchant',
  note: 'This is a mock merchant site',
  host: 'www.mockmerchant.com',
  tags: ['e-commerce', 'retail'],
  interface_type: 'web',
  job_type: 'full-time',
  required_form_fields: ['name', 'email', 'address'],
  images: [
    {
      url: 'https://d1t7g1oas7m24a.cloudfront.net/tiles/dynamic-synthetic-4?width=128&version=699b75be0871687b3ede6a430e5defeae80b76d6',
      width: 128,
      grayscale: false,
    },
    {
      url: 'https://d1t7g1oas7m24a.cloudfront.net/tiles/dynamic-synthetic-4?width=128&version=699b75be0871687b3ede6a430e5defeae80b76d6',
      width: 800,
      grayscale: true,
    },
  ],
  account_link: [
    {
      key_name: 'username',
      label: 'Username',
      secret: false,
      type: 'initial_account_link',
    },
    {
      key_name: 'password',
      label: 'Password',
      secret: true,
      type: 'initial_account_link',
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

export class StrivveService implements StrivveServiceInterface {
  constructor(options: StrivveServiceOptions) {}
  safe_key: string = '';

  async getMerchantSites(
    filters?: APIFilter | undefined
  ): Promise<MerchantSite[]> {
    const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return items.map((item, index) => ({
      ...merchantSite,
      id: `${merchantSite.id}-${index}`,
      name: `${merchantSite.name} ${index}`,
      tags: ['top_notify'],
    }));
  }

  init(): Promise<boolean> {
    return Promise.resolve(true);
  }

  async getMerchantSite(id: string): Promise<MerchantSite | undefined> {
    const data = await this.getMerchantSites();
    return data[0];
  }

  createJobs(data: JobBody[]): Promise<any> {
    return Promise.resolve({ body: [{ job_id: '1' }] });
  }

  createCardholder(body: CardholderBody): Promise<any> {
    return Promise.resolve({
      body: {
        id: 1,
      },
    });
  }

  createCardholderQuery(id: string): any {
    const query: any = {
      callbacks: {},
      addListener: (id: string, func: any, status: string) => {
        query.callbacks[status] = func;
      },
    };

    let count = 10;
    const interval = setInterval(() => {
      query.callbacks['job_status']?.({
        type: 'job_status',
        message: {
          auth_percent_complete: count,
          percent_complete: count,
          status: 'AUTH',
        },
      });
      count += 10;
      if (count >= 100) {
        query.callbacks['job_status']?.({
          type: 'job_status',
          message: {
            auth_percent_complete: count,
            percent_complete: count,
            status: 'SUCCESSFUL',
          },
        });
        clearInterval(interval);
      }
    }, 1000);
    return query;
  }

  createCard(data: CardBody): Promise<any> {
    return Promise.resolve({ body: { id: 1 } });
  }

  cancelJob(id: number): Promise<any> {
    return Promise.resolve({ body: { id: 1 } });
  }

  authorizeCardholder(data: any): Promise<any> {
    return Promise.resolve({ body: { id: 1 } });
  }

  setSafeKey(key: string): void {}

  postCreds(body: PostCredsBody): Promise<any> {
    return Promise.resolve({ body: { id: 1 } });
  }
}

export const serviceTest = new StrivveService({ api_instance: 'test' });

export const coreTest = new StrivveCore({
  service: serviceTest,
  card: {
    pan: '4111111111111111',
    cvv: '321',
    expiration_month: '2',
    expiration_year: '24',
    name_on_card: 'Mvick',
  },
});
