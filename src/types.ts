import { Interpolation, Theme } from '@emotion/react';
import { AccountLinkState } from './core/accountLink';
import StrivveCore from './core/core';
import { SelectSiteState } from './core/selectSite';

export type APIFilter = {
  [key: string]: string | string[];
} | null;

export interface Job {
  id: number | string;
  status: string;
  status_message: string;
  termination_type: string;
  notification_sent: boolean;
  time_elapsed: number;
  started_on: string;
  completed_on: string;
  created_on: string;
  last_updated_on: string;
  site?: MerchantSite;
  site_id?: string;
  auth_percent_complete?: number;
}

export interface Cardholder {
  agent_session_id?: number;
  created_on: string;
  cuid: string;
  custom_data?: string;
  email?: string;
  financial_institution_id: number;
  first_name?: string;
  grant: string;
  id: number;
  integrator_id: number;
  last_name?: string;
  last_updated_on?: string;
  meta_key?: string;
  type: 'persistent_creds';
  webhook_url?: string;
}

export interface MerchantSite {
  id: string;
  name: string;
  note?: string;
  host: string;
  tags?: (string | number)[];
  interface_type?: string;
  job_type?: string;
  required_form_fields: string[];
  images: {
    url: string;
    width: number;
    grayscale: boolean;
  }[];
  account_link: {
    key_name: string;
    label: string;
    type?: string;
    secret?: boolean;
  }[];
  messages?: {
    mfa_label: string;
    additional_info_message: string;
    auth_message: string;
  };
  script_directory?: string;
  record_final_site_artifacts?: boolean;
  puppeteer_screenshot?: boolean;
  login_page?: string;
  forgot_password_page?: string;
  credit_card_page?: string;
  wallet_page?: string;
  merchant_sso_group?: string;
  tier?: number;
  job?: Job;
}

export interface Card {
  address_id?: number;
  bin_id?: number;
  cardholder_id: number;
  created_on: string;
  custom_data?: any;
  customer_key: string;
  expiration_month: string;
  expiration_year: string;
  first_6: string;
  first_7: string;
  first_8: string;
  id: number;
  last_updated_on: string;
  name_on_card: string;
  nickname: string;
  par?: string;
  type: string;
}

export interface StrivveResponse<Body> {
  statusCode: number;
  statusText: string;
  headers: any;
  body: Body;
  call: string;
}

export interface StrivveServiceInterface {
  grant?: string;
  financial_institution?: string;
  fi_detail?: any;
  getMerchantSite(id: string): Promise<MerchantSite | undefined>;
  getMerchantSites(filters?: APIFilter): Promise<MerchantSite[]>;
  createJobs(body: JobBody[]): Promise<StrivveResponse<Job[]>>;
  createCardholder(body: CardholderBody): Promise<StrivveResponse<Cardholder>>;
  createCard(body: CardBody): Promise<StrivveResponse<Card>>;
  authorizeCardholder(
    grant: string
  ): Promise<
    StrivveResponse<{ cardholder_safe_key: string; cardholder: Cardholder }>
  >;
  createCardholderQuery(id: string): any;
  postCreds(body: PostCredsBody): Promise<any>;
  setSafeKey(key: string): void;
  init(): Promise<boolean>;
}

export interface StrivveServiceClass {
  new (options: StrivveServiceOptions): StrivveServiceInterface;
}
export interface Localization {
  selectSiteTitle?: string;
  selectSiteTitleHaveJob?: string;

  accountLinkTitle?: string;
  accountLinkDescription?: string;
}

export interface StrivveComponentInterface {
  core: StrivveCore;
  mountSelectSiteView: (
    id: string,
    options?: mountSelectSiteViewOptions
  ) => void;
  unmountSelectSiteView: (id: string) => void;
  mountAccountLinkView: (
    id: string,
    options: mountAccountLinkViewOptions
  ) => void;
  unmountAccountLinkView: (id: string) => void;
  mountLinkingJourney: (
    id: string,
    options: mountLinkingJourneyOptions
  ) => void;
}

export interface StrivveComponentClass {
  new (options: StrivveComponentOptions): StrivveComponentInterface;
}

export interface StrivveComponentOptions {
  core: StrivveCore;
  appearance?: Appearance;
  localization?: Localization;
}

export interface StrivveServiceOptions {
  api_instance: string;
  safe_key?: string;
  grant?: string;
  financial_institution?: string;
}
export interface mountAccountLinkViewOptions {
  site_id: string;
  quick_start?: boolean;
  subscribe?: (state: AccountLinkState) => void;
  onSubmit?: (values: any) => void;
  onCancel?: () => void;
}

export interface mountAccountLinkViewProps {
  options: mountAccountLinkViewOptions;
}

export interface mountSelectSiteViewOptions {
  filter?: APIFilter;
  multiple?: boolean;
  view?: 'list' | 'carousel';
  onSubmit?: (values: any) => void;
  onClose?: () => void;
  subscribe?: (state: SelectSiteState) => void;
}

export interface mountSelectSiteViewProps {
  options?: mountSelectSiteViewOptions;
}

export type mountLinkingJourneyOptions = {
  accountLinkOptions?: mountAccountLinkViewOptions;
  selectSiteOptions?: mountSelectSiteViewOptions;
};

export type Appearance = {
  layout?: {
    logoImageUrl?: string;
    appName?: string;
    unstyled?: boolean;
  };
  variables?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
    fontSize?: string;
    borderColor?: string;
    textColor?: string;
    textColorSecondary?: string;
  };
  elements?: {
    loader?: Interpolation<Theme>;
    button?: Interpolation<Theme>;
    secondaryButton?: Interpolation<Theme>;
    outlinedButton?: Interpolation<Theme>;
    textButton?: Interpolation<Theme>;
    iconButton?: Interpolation<Theme>;
    input?: Interpolation<Theme>;
    inputWrapper?: Interpolation<Theme>;
    label?: Interpolation<Theme>;
    link?: Interpolation<Theme>;
    errorText?: Interpolation<Theme>;

    tabContainer?: Interpolation<Theme>;
    tabItem?: Interpolation<Theme>;
    tabItemActive?: Interpolation<Theme>;

    selectSiteView?: Interpolation<Theme>;
    selectSiteList?: Interpolation<Theme>;
    selectSiteListFooter?: Interpolation<Theme>;
    selectSiteItem?: Interpolation<Theme>;
    selectSiteItemError?: Interpolation<Theme>;
    selectSiteItemSuccess?: Interpolation<Theme>;
    selectSiteTitle?: Interpolation<Theme>;
    selectSiteTitleLink?: Interpolation<Theme>;
    selectSiteHeader?: Interpolation<Theme>;
    selectSiteItemSelected?: Interpolation<Theme>;
    selectSiteItemImage?: Interpolation<Theme>;
    selectSiteItemName?: Interpolation<Theme>;
    selectSiteCarouselItem?: Interpolation<Theme>;
    selectSiteCarouselFooter?: Interpolation<Theme>;
    selectSiteCarouselItemSelected?: Interpolation<Theme>;
    selectSiteCarouselItemImage?: Interpolation<Theme>;
    selectSiteCarouselItemName?: Interpolation<Theme>;

    searchSiteView?: Interpolation<Theme>;
    searchSiteHeader?: Interpolation<Theme>;
    modal?: Interpolation<Theme>;
    modalStatus?: Interpolation<Theme>;
    modalTitle?: Interpolation<Theme>;
    modalDescription?: Interpolation<Theme>;

    accountLinkContainer?: Interpolation<Theme>;
    accountLinkHeader?: Interpolation<Theme>;
    accountLinkHeaderImageWrapper?: Interpolation<Theme>;
    accountLinkHeaderImage?: Interpolation<Theme>;
    accountLinkHeaderTitle?: Interpolation<Theme>;
    accountLinkHeaderDescription?: Interpolation<Theme>;
    accountLinkBody?: Interpolation<Theme>;
    accountLinkFooter?: Interpolation<Theme>;
    accountLinkView?: Interpolation<Theme>;
    accountLinkForm?: Interpolation<Theme>;
    accountLinkForgotLink?: Interpolation<Theme>;
    accountLinkProgress?: Interpolation<Theme>;
    accountLinkProgressCard?: Interpolation<Theme>;
    accountLinkProgressBar?: Interpolation<Theme>;
    accountLinkProgressTitle?: Interpolation<Theme>;
    accountLinkProgressDescription?: Interpolation<Theme>;
    accountLinkProgressFooter?: Interpolation<Theme>;
  };
};

export type CardBody = {
  id?: number;
  cardholder_id?: number;
  address_id?: number;
  bin_id?: number;
  par?: string;
  customer_key?: string;
  pan: string;
  cvv?: string;
  expiration_month: string;
  expiration_year: string;
  name_on_card: string;
  nickname?: string;
  address?: any;
};

export interface JobBody {
  account: { [k: string]: any };
  user_is_present?: boolean;
  cardholder?: { [k: string]: any };
  cardholder_id?: number;
  card?: CardBody;
  card_id?: number;
  status?: string;
  type?: string;
  queue_name?: string;
}

export interface CardholderBody {
  cuid?: string;
  type: 'ephemeral' | 'persistent_creds' | 'persistent_all';
  first_name?: string;
  last_name?: string;
  email?: string;
  meta_key?: string;
  webhook_url?: string;
  custom_data?: {
    [key: string]: any;
  };
}

export interface PostCredsBody {
  account_link: { [k: string]: string };
  job_id: string | number;
  envelope_id: string;
}
