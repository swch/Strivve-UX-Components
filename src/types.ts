import { Interpolation, SerializedStyles, Theme } from '@emotion/react';
import { AccountLinkState } from './core/accountLinkCore';
import StrivveCore from './core/strivveCore';
import { SelectSiteState } from './core/selectSiteCore';
import {CardDataState} from "./core/cardDataCore";

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
  percent_complete?: number;
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
  safe_key: string;
  queue_name_override?: string;
  cardholder?: any;
  getMerchantSite(id: string): Promise<MerchantSite | undefined>;
  getMerchantSites(filters?: APIFilter): Promise<MerchantSite[]>;
  createJobs(body: JobBody[]): Promise<StrivveResponse<Job[]>>;
  getCardholder(id: number): Promise<StrivveResponse<Cardholder>>;
  createCardholder(body: CardholderBody): Promise<StrivveResponse<Cardholder>>;
  createCard(body: CardBody): Promise<StrivveResponse<Card>>;
  updateCard(card_id: string, body: any, safeKey: string): Promise<StrivveResponse<Card>>;
  authorizeCardholder(
    grant: string
  ): Promise<
    StrivveResponse<{ cardholder_safe_key: string; cardholder: Cardholder }>
  >;
  getMissingCardDataFields(card_id: string, selected_sites: MerchantSite[]): Promise<string[]>;
  getCardholderQuery(id: string): any;
  postCreds(body: PostCredsBody): Promise<any>;
  setSafeKey(key: string): void;
  cancelJob(job_id: number): any;
  waitForLogin(): Promise<boolean>;
}

export interface StrivveServiceClass {
  new (options: StrivveServiceOptions): StrivveServiceInterface;
}
export interface Localization {
  intro_title?: string;
  intro_icon_text?: string;
  intro_step_title?: string;
  intro_step_one?: string;
  intro_step_one_description?: string;
  intro_step_two?: string;
  intro_step_two_description?: string;
  intro_btn?: string;

  site_selection_title_have_job?: string;

  logon_forgot_signin?: string;
  site_selection_btn_all_sites?: string;
  logon_btn_cancel?: string;
  logon_btn_link?: string;
  logon_progress_cancel?: string;
  logon_link_success_btn_browse?: string;
  logon_unpw_btn_verify?: string;
  logon_unpw_cancel?: string;
  logon_cancel_btn_leave?: string;
  logon_cancel_btn_stay?: string;
  logon_otp_btn_verify?: string;
  logon_otp_cancel?: string;
  logon_otp_retry_btn_verify?: string;
  logon_otp_retry_cancel?: string;
  logon_password_btn_verify?: string;
  logon_password_cancel?: string;
  logon_link_error_btn?: string;

  placement_success_details_btn_close?: string;
  placement_error_details_btn_close?: string;
  logon_title?: string;
  logon_link_success_title?: string;
  logon_card_placement_success_title?: string;
  placement_success_details_title?: string;
  placement_error_details_title?: string;
  all_sites_search_default?: string;
  site_selection_title?: string;
  all_sites_title?: string;
  all_sites_search_site_title?: string;
  all_sites_success_text?: string;
  all_sites_failure_text?: string;
  logon_text?: string;
  logon_progress_status?: string;
  logon_link_success_text?: string;
  logon_card_placement_success_background?: string;
  logon_cancel_title?: string;
  logon_cancel_text?: string;
  logon_otp_retry_default?: string;
  my_sites_error_title?: string;
  my_sites_error_text?: string;
  my_sites_success_title?: string;
  my_sites_success_text?: string;
  placement_success_details_text?: string;
  placement_error_details_text?: string;

  card_data_submit_btn_link?: string;
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
  mountCardDataView: (
    id: string,
    options?: mountCardDataViewOptions
  ) => void;
  unmountCardDataView:(id: string) => void;
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
  queue_name_override?: string;
}
export interface mountAccountLinkViewOptions {
  site_id: string;
  quick_start?: boolean;
  subscribe?: (state: AccountLinkState) => void;
  onSubmit?: (values: any) => void;
  onCancel?: () => void;
  messages?: Message[];
}

export interface mountIntroViewOptions {
  banner?: string;
  onClickBanner?: (values: any) => void;
  onClickButton?: () => void;
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

export interface mountHeaderOptions {
  title?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
}

export interface mountSelectSiteViewProps {
  options?: mountSelectSiteViewOptions;
}

export interface mountIntroViewProps {
  options?: mountIntroViewOptions;
}

export type mountLinkingJourneyOptions = {
  cardDataOptions?: mountCardDataViewOptions;
  accountLinkOptions?: mountAccountLinkViewOptions;
  selectSiteOptions?: mountSelectSiteViewOptions;
  introOptions?: mountIntroViewOptions;
  headerOptions?: mountHeaderOptions;
};

export interface mountCardDataViewOptions {
  onSubmit?: (values: any) => void;
  onCancel?: () => void;
  subscribe?: (state: CardDataState) => void;
}

export interface mountCardDataViewProps {
  options?: mountCardDataViewOptions
}

export type Appearance = {
  layout?: {
    logoImageUrl?: string;
    appName?: string;
    unstyled?: boolean;
    showBackButton?: boolean;
  };
  variables?: {
    primaryColor?: string;
    secondaryColor?: string;
    iconColor?: string;
    fontFamily?: string;
    fontSize?: string;
    borderColor?: string;
    textColor?: string;
    textColorSecondary?: string;
    height?: string;
    backgroundColor?: string;
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
    selectSiteItemDisabled?: Interpolation<Theme>;
    selectSiteItemDescription?: Interpolation<Theme>;
    selectSiteItemError?: Interpolation<Theme>;
    selectSiteItemSuccess?: Interpolation<Theme>;
    selectSiteItemCard?: Interpolation<Theme>;
    selectSiteItemHeader?: Interpolation<Theme>;
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

    mySiteTitle?: Interpolation<Theme>;
    mySiteDescription?: Interpolation<Theme>;

    searchSiteView?: Interpolation<Theme>;
    searchSiteHeader?: Interpolation<Theme>;
    searchSiteTitle?: Interpolation<Theme>;
    searchSiteClose?: Interpolation<Theme>;
    modal?: Interpolation<Theme>;
    modalStatus?: Interpolation<Theme>;
    modalWarning?: Interpolation<Theme>;
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

    accountLinkLoading?: Interpolation<Theme> | SerializedStyles;
    accountLinkLoadingBackground?: Interpolation<Theme> | SerializedStyles;

    introView?: Interpolation<Theme>;
    introTitle?: Interpolation<Theme>;
    introIconWrapper?: Interpolation<Theme>;

    introStepTitle?: Interpolation<Theme>;
    introStepWrapper?: Interpolation<Theme>;
    introStepIconWrapper?: Interpolation<Theme>;
    introStepDescription?: Interpolation<Theme>;
    introStepBanner?: Interpolation<Theme>;
    introStepButtonWrapper?: Interpolation<Theme>;

    headerWrapper?: Interpolation<Theme>;
    headerTitle?: Interpolation<Theme>;

    cardDataView?: Interpolation<Theme>;
    cardDataForm?: Interpolation<Theme>;
    cardDataHeaderDescription?: Interpolation<Theme>;
    cardDataTitle?: Interpolation<Theme>;
    cardDataFooter?: Interpolation<Theme>;
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
  queue_name_override?: string;
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

export interface Message {
  label: string;
}
