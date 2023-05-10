import React from 'react';
import ReactDOM from 'react-dom/client';
import AccountLinkView from './AccountLinkView';
import SelectSiteView from './SelectSiteView';
import { Appearance, MerchantSite, mountAccountLinkViewOptions, mountLinkingJourneyOptions, mountSelectSiteViewOptions, StrivveComponentInterface, StrivveComponentOptions } from '../types';
import StrivveCore from '../core/core';
import defaultAppearance from './appearance';


export default class StrivveComponent implements StrivveComponentInterface {
  core: StrivveCore;
  appearance: Appearance = defaultAppearance;
  private accountLink: { [key: string]: ReactDOM.Root } = {};
  private selectSite?: ReactDOM.Root;

  constructor({ core, appearance }: StrivveComponentOptions) {
    this.core = core;

    if (appearance) {
      this.appearance = appearance;
    }
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

  mountLinkingJourney(id: string, { selectSiteOptions, accountLinkOptions }: mountLinkingJourneyOptions) {
    this.mountSelectSiteView(id, {
      ...selectSiteOptions,
      onSubmit: (selected: MerchantSite[]) => {
        this.unmountSelectSiteView?.(id);
        const parent = document.getElementById?.(id);
        selected.forEach(item => {
          if (typeof document !== 'undefined') {
            const childrenId = `${id}-${item.id}`;
            const children = document.createElement('div');
            children.id = childrenId;
            parent?.append(children);
            this.mountAccountLinkView(childrenId, { ...accountLinkOptions, site_id: item.id });
          } else {
            const childrenId = `${id}-${item.id}`;
            this.mountAccountLinkView(childrenId, { ...accountLinkOptions, site_id: item.id });
          }
        })
      }
    })
  }
}