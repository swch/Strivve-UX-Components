import { StrivveServiceInterface } from "../types";
import AccountLinkCore, { AccountLinkCoreOption } from "./accountLink";
import SelectSiteCore, { SelectSiteCoreOptions } from "./selectSite";
 
export interface StrivveCoreOptions {
  service: StrivveServiceInterface;
  card_id?: string;
  card?: any;
}

export type CreateAccountLinkOptions = Omit<AccountLinkCoreOption, 'service' | 'onSubmit'> 

export type CreateSelectSiteOptions = Omit<SelectSiteCoreOptions, 'service'>

export default class StrivveCore {
  public service: StrivveServiceInterface;
  private cardholder: any;
  private card: any;
  private card_id?: string;
  private jobs: any[] = [];

  constructor({ service, card_id, card }: StrivveCoreOptions) {
    this.service = service;

    this.card_id = card_id;
    this.card = card;
  }

  createAccountLink(options: CreateAccountLinkOptions) {
    const job = this.jobs.find(item => item.site_id === options.site_id);
    return new AccountLinkCore({ ...options, job, onSubmit: (v: any, meta: any) => this.startJob(v, meta), service: this.service })
  }

  createSelectSite(options?: CreateSelectSiteOptions) {
    return new SelectSiteCore({ ...options, service: this.service })
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
            merchant_site_id: merchant.id,
            cardholder_id: cardholder?.id,
            account_link: creds,
            customer_key : `${merchant.id}${cardholder?.cuid}`
          },
        },
      ];
      const singleSiteJobResponse = await this.service.createJobs(
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