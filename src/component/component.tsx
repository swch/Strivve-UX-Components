  import React from 'react';
import ReactDOM from 'react-dom/client';
import AccountLinkView from './AccountLinkView';
import SelectSiteView from './SelectSiteView';
import { Appearance, MerchantSite, mountAccountLinkViewOptions, mountLinkingJourneyOptions, mountSelectSiteViewOptions, StrivveComponentInterface, StrivveComponentOptions } from '../types';
import StrivveCore from '../core/core';
import defaultAppearance from './appearance';
import SearchSiteView from './SearchSiteView';
import LinkingJourney from './LinkingJourney';

export default class StrivveComponent implements StrivveComponentInterface {
  core: StrivveCore;
  appearance: Appearance = defaultAppearance;
  private accountLink: { [key: string]: ReactDOM.Root } = {};
  private selectSite?: ReactDOM.Root;
  private searchSite?: ReactDOM.Root;
  private linkingJourney?: ReactDOM.Root;

  constructor({ core, appearance }: StrivveComponentOptions) {
    this.core = core;

    if (appearance) {
      this.appearance = this.mergeJSON(this.appearance, appearance);
    }
  }

  private mergeJSON(target: any, source: any): any {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (source[key] instanceof Object && key in target && target[key] instanceof Object) {
          target[key] = this.mergeJSON(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
    return target;
  }
  

  mountAccountLinkView(id: string, options: mountAccountLinkViewOptions) {
    const root = this.accountLink[id] ? this.accountLink[id] : ReactDOM.createRoot(
      document.getElementById(id) as HTMLElement
    );

    root.render(<AccountLinkView core={this.core} appearance={this.appearance} options={options} />)
    this.accountLink[id] = root;
  }

  unmountAccountLinkView(id: string) {
    this.accountLink[id]?.unmount();
  }

  mountSelectSiteView(id: string, options?: mountSelectSiteViewOptions) {
    const root = this.selectSite ? this.selectSite : ReactDOM.createRoot(
      document.getElementById(id) as HTMLElement
    );

    root.render(<SelectSiteView appearance={this.appearance} core={this.core} options={options} />)
    this.selectSite = root;
  }

  unmountSelectSiteView(id: string) {
    this.selectSite?.unmount();
  }

  mountSearchSiteView(id: string, options?: mountSelectSiteViewOptions) {
    const parent = document.getElementsByTagName('body')[0];
    let element = document.getElementById('strivve-modal');
    if (!element) {
      const children = document.createElement('div');
      children.id = 'strivve-modal';
      parent?.append(children);
      element = document.getElementById('strivve-modal');
    }

    const root = this.searchSite ? this.searchSite : ReactDOM.createRoot(
      element as HTMLElement
    );

    root.render(<SearchSiteView appearance={this.appearance} core={this.core} options={options} />)
    this.searchSite = root;
  }

  unmountSearchSiteView(id: string) {
    this.searchSite?.unmount();
  }

  mountLinkingJourney(id: string, { selectSiteOptions, accountLinkOptions }: mountLinkingJourneyOptions) {
    const root = this.linkingJourney ? this.linkingJourney : ReactDOM.createRoot(
      document.getElementById(id) as HTMLElement
    );

    root.render(<LinkingJourney appearance={this.appearance} core={this.core} selectSiteOptions={selectSiteOptions} accountLinkOptions={accountLinkOptions} />)
    this.linkingJourney = root;
  }
}