import React from 'react';
import ReactDOM from 'react-dom/client';
import AccountLink from './AccountLink';
import SelectSite from './SelectSite';
import { BaseStyle, MountAccountLinkProps, MountSelectSiteProps, StrivveComponentInterface, StrivveComponentOptions } from '../types';


export default class StrivveComponent implements StrivveComponentInterface {
  private accountLink: { [key:string]: ReactDOM.Root } = {}; 
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

  constructor({ style }: StrivveComponentOptions) {
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

  mountAccountLink(id: string, props: MountAccountLinkProps) {    
    const root = this.accountLink[id] ? this.accountLink[id] : ReactDOM.createRoot(
      document.getElementById(id) as HTMLElement
    );

    root.render(<AccountLink state={props.state} accountLinkCore={props.accountLinkCore} style={this.style} options={props.options} />)
    this.accountLink[id] = root;
  }

  unmountAccountLink(id: string) {
    this.accountLink[id]?.unmount();
  }

  mountSelectSite(id: string, props?: MountSelectSiteProps) {
    const root = this.selectSite ? this.selectSite : ReactDOM.createRoot(
      document.getElementById(id) as HTMLElement
    );

    root.render(<SelectSite style={this.style} state={props?.state} selectSiteCore={props?.selectSiteCore} options={props?.options}/>)
    this.selectSite = root;
  }

  unmountSelectSite(id: string) {
    this.selectSite?.unmount();
  }
}