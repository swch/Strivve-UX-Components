import StrivveService from './service/service';
import StrivveCore, { StrivveCoreMount, StrivveCoreOptions } from './core/core';
import StrivveComponent from './component/component';
import {
  Appearance,
  Localization,
  StrivveComponentClass,
  StrivveComponentInterface,
  StrivveComponentOptions,
  StrivveServiceClass,
  StrivveServiceOptions,
  mountAccountLinkViewOptions,
  mountHeaderOptions,
  mountIntroViewOptions,
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
  header?: mountHeaderOptions;
  intro?: mountIntroViewOptions;
  reset?: boolean;
  eventHandler?: (action: string, data?: any) => void;
}

export default class Strivve {
  public core?: StrivveCore;
  public component?: StrivveComponentInterface;

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
    intro,
    header,
    eventHandler,
  }: mountLinkingJourneyStrivve) {
    const createService = Service
      ? new Service({ api_instance, grant, financial_institution })
      : this.createService({ api_instance, grant, financial_institution });

    const core = this.createCore({
      service: createService,
      card,
      card_id,
      reset,
      mount: intro ? StrivveCoreMount.INTRO : StrivveCoreMount.SELECT_SITE,
      eventHandler,
    });

    const createComponent = Component
      ? new Component({ appearance, core, localization })
      : this.createComponent({ appearance, core, localization });

    createComponent.mountLinkingJourney(element_id, {
      selectSiteOptions: select_site,
      accountLinkOptions: account_link,
      introOptions: intro,
      headerOptions: header,
    });

    this.component = createComponent;

    return this;
  }
}
