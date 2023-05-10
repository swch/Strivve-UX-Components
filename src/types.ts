import { Interpolation } from '@emotion/react';
import { CustomComponent } from './component/parser';
import AccountLinkCore, { AccountLinkState, Field } from './core/accountLink';
import StrivveCore, { CreateAccountLinkOptions } from './core/core';
import SelectSiteCore, { SelectSiteCoreOptions, SelectSiteState } from './core/selectSite';

export type APIFilter = number | {
  [key: string]: string | string[];
} | null;

export type MerchantSite = {
  id: string;
  name: string;
  account_link: any[];
  images: any[];
}

export interface StrivveServiceInterface {
  grant?: string;
  getMerchantSite(id: string): Promise<MerchantSite | undefined>;
  getMerchantSites(filters?: APIFilter): Promise<MerchantSite[]>;
  createJob(data: any): Promise<any>;
  createCardholder(data: any): Promise<any>;
  createCard(data: any): Promise<any>;
  authorizeCardholder(data: any): Promise<any>;
  createCardholderQuery(id: string): any;
  postCreds(body: any): Promise<any>;
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
  style?: BaseStyle;
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
  view?: 'list' | 'grid'
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
  accountLinkOptions: CreateAccountLinkOptions
  selectSiteOptions: SelectSiteCoreOptions
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