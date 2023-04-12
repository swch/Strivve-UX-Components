import StrivveService, { StrivveServiceOptions } from './service/service';
import StrivveCore, { StrivveCoreOptions } from './core/core';
import StrivveComponent, { MountFullAccountLinkOptions, StrivveComponentOptions } from './component/component';
import { BaseStyle } from './types';
import { MerchantSite } from './service/types';

declare global {
    interface Window {
        [key: string]: any;
    }
}


export interface CreateFullAccountLinkingOptions extends MountFullAccountLinkOptions {
    api_instance: string
    card?: any
    style?: BaseStyle
    element_id: string
    grant?: string
    card_id?: string
    Component?: any
    Service?: any
}

export default class Strivve {

    createCore = (options: StrivveCoreOptions) => new StrivveCore(options);

    createService = (options: StrivveServiceOptions) => new StrivveService(options);

    createComponent = (options: StrivveComponentOptions) => new StrivveComponent(options);

    createFullAccountLinking = ({ Component, Service, element_id, api_instance, card, style, grant, card_id, select_sites = {}, account_link = {} }: CreateFullAccountLinkingOptions) => {
        const createService = Service ? new Service({ api_instance, grant }) : this.createService({ api_instance, grant })
        const core = this.createCore({
            card,
            card_id,
            service: createService
        })
        const createComponent = Component ? new Component({ core, style }) : this.createComponent({ core, style });
        createComponent.mountSelectSites(element_id, {
            ...select_sites,
            onSubmit: (selected: MerchantSite[]) => {
                createComponent.unmountSelectSites(element_id);
                createComponent.mountAccountLink(element_id, {
                    ...account_link,
                    merchant_site_id: selected.map(item => item.id),
                })              
            }
        })
    }
}