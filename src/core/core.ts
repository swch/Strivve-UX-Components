import { MerchantSite, StrivveComponentInterface, StrivveServiceInterface } from "../types";
import { BaseStyle } from "../types";
import AccountLinkCore, { AccountLinkCoreOption, AccountLinkState } from "./accountLink";
import SelectSiteCore, { SelectSiteCoreOptions, SelectSiteState } from "./selectSite";
 
export interface StrivveCoreOptions {
  service: StrivveServiceInterface;
  component?: StrivveComponentInterface;
  card_id?: string;
  card?: any;
  style?: BaseStyle
}

export type CreateAccountLinkOptions = Omit<AccountLinkCoreOption, 'service' | 'onSubmit'> 

export type CreateSelectSiteOptions = Omit<SelectSiteCoreOptions, 'service'>

export type mountLinkingJourneyOptions = {
  accountLinkingOptions: CreateAccountLinkOptions
  selectSiteOptions: SelectSiteCoreOptions
}
export default class StrivveCore {
  public service: StrivveServiceInterface;
  private cardholder: any;
  private card: any;
  private card_id?: string;
  private jobs: any[] = [];
  private component?: StrivveComponentInterface;

  constructor({ service, card_id, card, component }: StrivveCoreOptions) {
    const myInstance = {} as StrivveComponentInterface; // Create an instance of the interface
    if (!this.checkInterfaceImplementation(service, myInstance)) {
      throw new Error('Service does not implement StrivveServiceInterface')
    }

    this.service = service;
    this.component = component;

    this.card_id = card_id;
    this.card = card;
  }

  checkInterfaceImplementation(className: any, interfaceName: any): boolean {
    const interfaceMethods = Object.getOwnPropertyNames(interfaceName);
    const classMethods = Object.getOwnPropertyNames(className);
  
    for (let i = 0; i < interfaceMethods.length; i++) {
      if (!classMethods.includes(interfaceMethods[i])) {
        return false;
      }
    }
  
    return true;
  }

  createAccountLink(options: CreateAccountLinkOptions) {
    const job = this.jobs.find(item => item.site_id === options.site_id);
    return new AccountLinkCore({ ...options, job, onSubmit: (v: any, meta: any) => this.startJob(v, meta), service: this.service })
  }

  createSelectSite(options?: CreateSelectSiteOptions) {
    return new SelectSiteCore({ ...options, service: this.service })
  }

  mountSelectSiteView(id: string, options?: CreateSelectSiteOptions) {
    const selectSiteCore = this.createSelectSite(options);
    selectSiteCore.subscribe((state: SelectSiteState) => {
      this.component?.mountSelectSiteView?.(id, { state, selectSiteCore, options });
    });
  }

  mountAccountLinkView(id: string, options: CreateAccountLinkOptions) {
    const accountLinkCore = this.createAccountLink(options);
    accountLinkCore.subscribe((state: AccountLinkState) => {
      this.component?.mountAccountLinkView?.(id, { state, accountLinkCore, options });
    })
  }

  mountLinkingJourney(id: string, { selectSiteOptions, accountLinkingOptions }: mountLinkingJourneyOptions) {
    this.mountSelectSiteView(id, {
      ...selectSiteOptions,
      onSubmit: (selected: MerchantSite[]) => {
        this.component?.unmountSelectSiteView?.(id);
        const parent = document.getElementById?.(id);
        selected.forEach(item => {
          if (typeof document !== 'undefined') {
            const childrenId = `${id}-${item.id}`;
            const children = document.createElement('div');
            children.id = childrenId;
            parent?.append(children);
            this.mountAccountLinkView(childrenId, { ...accountLinkingOptions, site_id: item.id });
          } else {
            const childrenId = `${id}-${item.id}`;
            this.mountAccountLinkView(childrenId, { ...accountLinkingOptions, site_id: item.id });
          }
        })
      }
    })
  }
  
  async startJob(
    creds: { [key: string]: any },
    meta?: { merchant_site: any }
  ) {

    try {
      let cardholder = this.cardholder;
      let card = this.card;
      const merchant = meta?.merchant_site;
  
      if (this.service.grant) {
        const authorize = await this.service.authorizeCardholder(
          this.service.grant
        );
        cardholder = authorize.body.cardholder;
        this.cardholder = cardholder;
        this.service.setSafeKey(authorize.body.cardholder_safe_key);
      }
      if (!cardholder?.id) {
        const cardholderResponse = await this.service.createCardholder(
          {
            type: "persistent_creds",
          },
        );
        cardholder = cardholderResponse.body;
        await this.service.authorizeCardholder(cardholder.grant);
        this.cardholder = cardholder;
      }

      // card
      if (this.card_id) {
        card = { id: this.card_id }
      }

      if (!card?.id) {
        const createCardResponse = await this.service.createCard(
          {
            ...card,
            cardholder_id: cardholder.id,
          },
        );
  
        card = createCardResponse.body;
      }
      this.card = card;
  
      const jobs = [
        {
          cardholder_id: cardholder?.id,
          card_id: card?.id,
          status: "REQUESTED",
          account: {
            site_id: merchant.id,
            cardholder_id: cardholder?.id,
            account_link: creds,
            customer_key : `${merchant.id}$${cardholder?.cuid}`
          },
        },
      ];
      const singleSiteJobResponse = await this.service.createJob(
        jobs,
      );

      const job =  singleSiteJobResponse.body[0];
      job.site_id = merchant.id;
      this.jobs.push(job);
      return job;
    } catch (error: any) {
      throw error;
    }
  }

}