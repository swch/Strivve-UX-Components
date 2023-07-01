import StrivveService from './service/service';
import StrivveCore, { StrivveCoreOptions } from './core/core';
import StrivveComponent from './component/component';
import {
  Appearance,
  StrivveComponentClass,
  StrivveComponentOptions,
  StrivveServiceClass,
  StrivveServiceOptions,
  mountLinkingJourneyOptions,
} from './types';

declare global {
  interface Window {
    [key: string]: any;
  }
}

export interface mountLinkingJourneyStrivve extends mountLinkingJourneyOptions {
  api_instance: string;
  card?: any;
  appearance?: Appearance;
  element_id: string;
  grant?: string;
  card_id?: string;
  Component?: StrivveComponentClass;
  Service?: StrivveServiceClass;
}

export default class Strivve {
  createCore = (options: StrivveCoreOptions): StrivveCore => {
    return new StrivveCore(options);
  };

  createService = (options: StrivveServiceOptions): StrivveService =>
    new StrivveService(options);

  createComponent = (options: StrivveComponentOptions): StrivveComponent =>
    new StrivveComponent(options);

  mountLinkingJourney = ({
    Component,
    Service,
    element_id,
    api_instance,
    card,
    appearance,
    grant,
    card_id,
    accountLinkOptions,
    selectSiteOptions,
  }: mountLinkingJourneyStrivve) => {
    const createService = Service
      ? new Service({ api_instance, grant })
      : this.createService({ api_instance, grant });

    const core = this.createCore({
      service: createService,
      card,
      card_id,
    });

    const createComponent = Component
      ? new Component({ appearance, core })
      : this.createComponent({ appearance, core });

    createComponent.mountLinkingJourney(element_id, {
      selectSiteOptions,
      accountLinkOptions,
    });
  };
}
