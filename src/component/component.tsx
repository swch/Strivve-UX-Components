import React from 'react';
import ReactDOM from 'react-dom/client';
import AccountLinkView from './AccountLinkView';
import SelectSiteView from './SelectSiteView';
import { BaseStyle, mountAccountLinkViewProps, mountSelectSiteViewProps, StrivveComponentInterface, StrivveComponentOptions } from '../types';


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

  mountAccountLinkView(id: string, props: mountAccountLinkViewProps) {    
    const root = this.accountLink[id] ? this.accountLink[id] : ReactDOM.createRoot(
      document.getElementById(id) as HTMLElement
    );

    root.render(<AccountLinkView state={props.state} accountLinkCore={props.accountLinkCore} style={this.style} options={props.options} />)
    this.accountLink[id] = root;
  }

  unmountAccountLinkView(id: string) {
    this.accountLink[id]?.unmount();
  }

  mountSelectSiteView(id: string, props?: mountSelectSiteViewProps) {
    const root = this.selectSite ? this.selectSite : ReactDOM.createRoot(
      document.getElementById(id) as HTMLElement
    );

    root.render(<SelectSiteView style={this.style} state={props?.state} selectSiteCore={props?.selectSiteCore} options={props?.options}/>)
    this.selectSite = root;
  }

  unmountSelectSiteView(id: string) {
    this.selectSite?.unmount();
  }
}