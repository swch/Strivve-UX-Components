import { Interpolation } from '@emotion/react';
import { CustomComponent } from './component/parser';
import { Field } from './core/accountLink';
import StrivveCore, { CreateAccountLinkOptions } from './core/core';
import { SelectSiteCoreOptions } from './core/selectSite';

export type APIFilter = number | {
  [key: string]: string | string[];
} | null;


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
    type: string;
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
}

export interface StrivveServiceInterface {
  grant?: string;
  getMerchantSite(id: string): Promise<MerchantSite | undefined>;
  getMerchantSites(filters?: APIFilter): Promise<MerchantSite[]>;
  createJobs(data: JobBody[]): Promise<any>;
  createCardholder(body: CardholderBody): Promise<any>;
  createCard(data: CardBody): Promise<any>;
  authorizeCardholder(data: any): Promise<any>;
  createCardholderQuery(id: string): any;
  postCreds(body: PostCredsBody): Promise<any>;
  setSafeKey(key: string): void;
}

export interface StrivveServiceClass {
  new (options: StrivveServiceOptions): StrivveServiceInterface;
}
export interface BaseStyle {
  primary_color: string;
  background_color: string;
  text_color: string;
  font_size: number;
  font_family: string;
  spacing_unit: number;
  border_radius: number;
  border_color: string;
}

export interface Localization {
  success_message: string;
  link_button: string;
}

export interface StrivveComponentInterface {
  core: StrivveCore
  mountSelectSiteView: (id: string, options?: mountSelectSiteViewOptions) => void
  unmountSelectSiteView: (id: string) => void;
  mountAccountLinkView: (id: string, options: mountAccountLinkViewOptions) => void
  unmountAccountLinkView: (id: string) => void;
  mountLinkingJourney: (id: string, options: mountLinkingJourneyOptions) => void;
}

export interface StrivveComponentClass {
  new (options: StrivveComponentOptions): StrivveComponentInterface;
}

export interface StrivveComponentOptions {
  core: StrivveCore;
  appearance?: any;
}

export interface StrivveServiceOptions {
  api_instance: string;
  safe_key?: string;
  grant?: string;
}
export interface mountAccountLinkViewComponents {
  input: (data: Field & { change: (name: string, value: any) => void }) => CustomComponent,
  progress: (data: any) => CustomComponent
  button: (data: any) => CustomComponent
}
export interface mountAccountLinkViewOptions {
  site_id: string
  quick_start?: boolean
  hide_title?: boolean
  components?: mountAccountLinkViewComponents
}

export interface mountAccountLinkViewProps {
  options: mountAccountLinkViewOptions
}

export interface mountSelectSiteViewComponent {
  search: (data: any) => CustomComponent
  button: (data: any) => CustomComponent
  item: (data: any) => CustomComponent
  container: (data: any) => CustomComponent
}

export interface mountSelectSiteViewOptions {
  filter?: APIFilter
  single?: boolean
  onSubmit?: Function
  hide_search?: boolean
  hide_button?: boolean
  components?: mountSelectSiteViewComponent
}

export interface mountSelectSiteViewProps {
  options?: mountSelectSiteViewOptions
}
export interface BaseStyle {
  primary_color: string;
  background_color: string;
  text_color: string;
  font_size: number;
  font_family: string;
  spacing_unit: number;
  border_radius: number;
  border_color: string;
  [key: string]: any;
}

export type mountLinkingJourneyOptions = {
  accountLinkOptions?: CreateAccountLinkOptions
  selectSiteOptions?: SelectSiteCoreOptions
}

export type Appearance = {
  elements?: {
    button?: Interpolation<any>,
    input?: Interpolation<any>,
    label?: Interpolation<any>,
    selectSiteList?: Interpolation<any>,
    selectSiteItem?: Interpolation<any>,
    selectSiteItemSelected?: Interpolation<any>,
    selectSiteItemImage?: Interpolation<any>,
    selectSiteItemName?: Interpolation<any>,
    accountLinkContainer?: Interpolation<any>,
    accountLinkHeader?: Interpolation<any>,
    accountLinkHeaderImage?: Interpolation<any>,
    accountLinkHeaderTitle?: Interpolation<any>,
    accountLinkBody?: Interpolation<any>,
    accountLinkFooter?: Interpolation<any>,
  }
}

export type CardBody = {
  cardholder_id: number;
  address_id?: number;
  bin_id?: number;
  par?: string;
  customer_key: string;
  pan: string;
  cvv: string;
  expiration_month: number;
  expiration_year: number;
  name_on_card: string;
  nickname?: string;
};

export interface JobBody {
    account : {[k: string]: any},
    user_is_present? : boolean,
    cardholder?: {[k: string]: any}, 
    cardholder_id? : number,
    card? : CardBody,
    card_id? : number,
    status? : string,
    type? : string,
    queue_name? : string
}

export interface CardholderBody {
  cuid?: string;
  type: "ephemeral" | "persistent_creds" | "persistent_all";
  first_name?: string;
  last_name?: string;
  email?: string;
  meta_key?: string;
  webhook_url?: string;
  custom_data?: {
    [key: string]: any
  };
}

export interface PostCredsBody {
  account_link: {[k: string]: string}, 
  job_id: string, 
  envelope_id: string,
}
