import { CustomComponent } from './component/parser';
import AccountLinkCore, { AccountLinkState, Field } from './core/accountLink';
import SelectSiteCore, { SelectSiteState } from './core/selectSite';

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
  mountSelectSite: (id: string, props?: MountSelectSiteProps) => void
  unmountSelectSite: (id: string) => void;
  mountAccountLink: (id: string, props: MountAccountLinkProps) => void
  unmountAccountLink: (id: string) => void;
}

export interface StrivveComponentClass {
  new (options: StrivveComponentOptions): StrivveComponentInterface;
}

export interface StrivveComponentOptions {
  style?: BaseStyle;
}

export interface StrivveServiceOptions {
  api_instance: string;
  safe_key?: string;
  grant?: string;
}
export interface MountAccountLinkComponents {
  input: (data: Field & { change: (name: string, value: any) => void }) => CustomComponent,
  progress: (data: any) => CustomComponent
  button: (data: any) => CustomComponent
}
export interface MountAccountLinkOptions {
  merchant_site_id?: string | string[]
  quick_start?: boolean
  hide_title?: boolean
  components?: MountAccountLinkComponents
}

export interface MountAccountLinkProps {
  options: MountAccountLinkOptions
  state: AccountLinkState
  accountLinkCore: AccountLinkCore
}

export interface MountSelectSiteComponent {
  search: (data: any) => CustomComponent
  button: (data: any) => CustomComponent
  item: (data: any) => CustomComponent
  container: (data: any) => CustomComponent
}

export interface MountSelectSiteOptions {
  filter?: APIFilter
  single?: boolean
  onSubmit?: Function
  hide_search?: boolean
  hide_button?: boolean
  view?: 'list' | 'grid'
  components?: MountSelectSiteComponent
}

export interface MountSelectSiteProps {
  options?: MountSelectSiteOptions
  state: SelectSiteState
  selectSiteCore: SelectSiteCore
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