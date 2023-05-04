import StrivveService from './service/service';
import StrivveCore, { StrivveCoreOptions } from './core/core';
import StrivveComponent from './component/component';
import { BaseStyle, StrivveComponentClass, StrivveComponentOptions, StrivveServiceClass, StrivveServiceOptions } from './types';

declare global {
    interface Window {
        [key: string]: any;
    }
}

export interface mountLinkingJourneyOptions  {
    api_instance: string
    card?: any
    style?: BaseStyle
    element_id: string
    grant?: string
    card_id?: string
    Component?: StrivveComponentClass
    Service?: StrivveServiceClass
    select_site?: any
    account_link?: any
}

export default class Strivve {

    createCore = (options: StrivveCoreOptions) => {

        if (!options?.component) {
            options.component = new StrivveComponent({ style: options?.style });
        }

        return new StrivveCore(options)
    };

    createService = (options: StrivveServiceOptions) => new StrivveService(options);

    createComponent = (options: StrivveComponentOptions): StrivveComponent => new StrivveComponent(options);

    mountLinkingJourney = ({ Component, Service, element_id, api_instance, card, style, grant, card_id, select_site = {}, account_link = {} }: mountLinkingJourneyOptions) => {
        const createService = Service ? new Service({ api_instance, grant }) : this.createService({ api_instance, grant })
        const createComponent = Component ? new Component({ style }) : this.createComponent({ style });
        
        const core = this.createCore({
            component: createComponent,
            service: createService,
            card,
            card_id,
        })

        core.mountLinkingJourney(element_id, {
            selectSiteOptions: select_site,
            accountLinkingOptions: account_link
        })
    }
}