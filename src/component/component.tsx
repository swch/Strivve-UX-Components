/* eslint-disable react-hooks/rules-of-hooks */
import ReactDOM from 'react-dom/client';
import StrivveCore from "../core/core";
import AccountLink from './AccountLink';
import SelectSite from './SelectSite';
import FullAccountLinking from './FullAccountLinking';
import { APIFilter } from '../service/types';
import { CustomComponent } from './parser';
import { Field } from '../core/accountLink';
import { StrivveComponent } from '../types';

export interface StrivveComponentOptions {
  core: StrivveCore;
  style?: BaseStyle;
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

export interface MountSelectSitesComponent {
  search: (data: any) => CustomComponent
  button: (data: any) => CustomComponent
  item: (data: any) => CustomComponent
  container: (data: any) => CustomComponent
}

export interface MountSelectSitesOptions {
  filter?: APIFilter
  single?: boolean
  onSubmit?: Function
  hide_search?: boolean
  hide_button?: boolean
  view?: 'list' | 'grid'
  components?: MountSelectSitesComponent
}

export interface MountFullAccountLinkOptions {
  select_sites?: MountSelectSitesOptions
  account_link?: MountAccountLinkOptions
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

export default class UIComponent implements StrivveComponent {
  core: StrivveCore;
  private accountLink?: ReactDOM.Root; 
  private selectSite?: ReactDOM.Root; 
  style: BaseStyle = {
    background_color: 'white',
    font_family: 'sans-serif',
    primary_color: 'black',
    text_color: '#1c1c1c',
    spacing_unit: 12,
    border_radius: 4,
    font_size: 14,
    border_color: 'lightgray',
  };

  constructor({ core, style }: StrivveComponentOptions) {
    this.core = core;
    if (style) {
      this.style = this.deepMerge(this.style, style);
    }
  }

  private deepMerge = (a: any, b: any) => {
    return Object.entries({ ...b }).reduce((o, [k, v]) => {
      o[k] = v && typeof v === 'object'
        ? this.deepMerge(o[k] = o[k] || (Array.isArray(v) ? [] : {}), v)
        : v;
      return o;
    }, { ...a });
  }

  mountAccountLink(id: string, options: MountAccountLinkOptions) {

    const root = ReactDOM.createRoot(
      document.getElementById(id) as HTMLElement
    );

    root.render(<AccountLink core={this.core} style={this.style} options={options} />)
    this.accountLink = root;
  }

  unmountAccountLink() {
    this.accountLink?.unmount();
  }

  mountSelectSites(id: string, options?: MountSelectSitesOptions) {

    const root = ReactDOM.createRoot(
      document.getElementById(id) as HTMLElement
    );

    root.render(<SelectSite core={this.core} style={this.style} options={options} />)
    this.selectSite = root;
  }

  unmountSelectSites() {
    this.selectSite?.unmount();
  }


  mountFullAccountLinking(id: string, options: MountFullAccountLinkOptions) {

    const root = ReactDOM.createRoot(
      document.getElementById(id) as HTMLElement
    );

    root.render(<FullAccountLinking core={this.core} style={this.style} options={options} />)
  }
}