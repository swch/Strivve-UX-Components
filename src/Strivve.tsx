import StrivveService from './service/service';
import StrivveCore, { StrivveCoreOptions } from './core/core';
import StrivveComponent from './component/component';
import {
  Appearance,
  Localization,
  StrivveComponentClass,
  StrivveComponentOptions,
  StrivveServiceClass,
  StrivveServiceOptions,
  mountAccountLinkViewOptions,
  mountSelectSiteViewOptions,
} from './types';

declare global {
  interface Window {
    [key: string]: any;
  }
}

export interface mountLinkingJourneyStrivve {
  api_instance: string;
  card?: any;
  appearance?: Appearance;
  localization?: Localization;
  element_id: string;
  grant?: string;
  financial_institution?: string;
  card_id?: string;
  Component?: StrivveComponentClass;
  Service?: StrivveServiceClass;
  account_link?: mountAccountLinkViewOptions;
  select_site?: mountSelectSiteViewOptions;
  reset?: boolean;
}

export default class Strivve {
  public core?: StrivveCore;

  createCore(options: StrivveCoreOptions): StrivveCore {
    this.core = new StrivveCore(options);
    return this.core;
  }

  createService = (options: StrivveServiceOptions): StrivveService =>
    new StrivveService(options);

  createComponent = (options: StrivveComponentOptions): StrivveComponent =>
    new StrivveComponent(options);

  mountLinkingJourney({
    Component,
    Service,
    element_id,
    api_instance,
    card,
    appearance,
    localization,
    grant,
    card_id,
    select_site,
    account_link,
    financial_institution,
    reset,
  }: mountLinkingJourneyStrivve) {
    const createService = Service
      ? new Service({ api_instance, grant, financial_institution })
      : this.createService({ api_instance, grant, financial_institution });

    const core = this.createCore({
      service: createService,
      card,
      card_id,
      reset,
    });

    const createComponent = Component
      ? new Component({ appearance, core, localization })
      : this.createComponent({ appearance, core, localization });

    createComponent.mountLinkingJourney(element_id, {
      selectSiteOptions: select_site,
      accountLinkOptions: account_link,
    });

    return this;
  }
}
