import { Job, StrivveServiceInterface } from '../types';
import AccountLinkCore, { AccountLinkCoreOption } from './accountLink';
import SelectSiteCore, { SelectSiteCoreOptions } from './selectSite';

export interface StrivveCoreOptions {
  service: StrivveServiceInterface;
  card_id?: string;
  card?: any;
}

export type CreateAccountLinkOptions = Omit<
  AccountLinkCoreOption,
  'service' | 'onSubmit'
>;

export enum StrivveCoreMount {
  ACCOUNT_LINK = 'account_link',
  SELECT_SITE = 'select_site',
}

export type CreateSelectSiteOptions = Omit<SelectSiteCoreOptions, 'service'>;

export type StrivveCoreState = {
  mount: StrivveCoreMount;
};

export default class StrivveCore {
  public service: StrivveServiceInterface;
  private cardholder: any;
  private card: any;
  private card_id?: string;
  public jobs: any[] = [];
  public selectSiteCore?: SelectSiteCore;
  public accountLinkCore?: AccountLinkCore;
  private subscriber: Function = () => {};
  public state: StrivveCoreState = {
    mount: StrivveCoreMount.SELECT_SITE,
  };

  constructor({ service, card_id, card }: StrivveCoreOptions) {
    this.service = service;

    this.card_id = card_id;
    this.card = card;

    this.getJobs();
  }

  public subscribe(func: Function) {
    this.subscriber = func;
    this.notifyState();
  }

  public setState(value: Partial<StrivveCoreState>) {
    this.state = {
      ...this.state,
      ...value,
    };
    this.notifyState();
  }

  private notifyState() {
    this.subscriber(this.state);
  }

  setMount(mount: StrivveCoreMount) {
    this.setState({ mount });
  }

  goBack(): boolean {
    if (this.state.mount === StrivveCoreMount.ACCOUNT_LINK) {
      this.setMount(StrivveCoreMount.SELECT_SITE);
      return true;
    } else if (this.selectSiteCore?.state.step === 2) {
      this.selectSiteCore?.setStep(1);
      return true;
    } else {
      return false;
    }
  }

  getJobs(): Job[] {
    const local = localStorage.getItem('jobs');
    if (local) {
      try {
        const newJobs = JSON.parse(local)?.filter(
          (item: Job) => item?.termination_type
        );
        this.jobs = newJobs;

        return newJobs;
      } catch (err) {}
    }

    return [];
  }

  private updateJobs(jobs: any) {
    this.jobs = jobs;
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }

  private onMessage(id: string, message: any) {
    if (this.jobs) {
      this.updateJobs(
        this.jobs.map((job) => {
          if (job.id === id) {
            return {
              ...job,
              ...message,
            };
          }
          return job;
        })
      );
    }
  }

  createAccountLink(options: CreateAccountLinkOptions): AccountLinkCore {
    const job = this.jobs.find(
      (item) => item.site_id === options.site_id && !item?.termination_type
    );
    this.accountLinkCore = new AccountLinkCore({
      ...options,
      job,
      onMessage: (id, messageg) => this.onMessage(id, messageg),
      onSubmit: (v: any, meta: any) => this.startJob(v, meta),
      service: this.service,
    });

    return this.accountLinkCore;
  }

  createSelectSite(options?: CreateSelectSiteOptions): SelectSiteCore {
    const jobs = this.getJobs();
    const isFirst = jobs.length === 0;
    this.selectSiteCore = new SelectSiteCore({
      ...options,
      service: this.service,
      step: isFirst ? 0 : 2,
      tab: isFirst ? 0 : 2,
    });
    return this.selectSiteCore;
  }

  async startJob(creds: { [key: string]: any }, meta?: { site: any }) {
    try {
      let cardholder = this.cardholder;
      let card = this.card;
      const site = meta?.site;

      if (this.service.grant) {
        const authorize = await this.service.authorizeCardholder(
          this.service.grant
        );
        cardholder = authorize.body.cardholder;
        this.cardholder = cardholder;
        this.service.setSafeKey(authorize.body.cardholder_safe_key);
      }
      if (!cardholder?.id) {
        const cardholderResponse = await this.service.createCardholder({
          type: 'persistent_creds',
        });
        cardholder = cardholderResponse.body;
        await this.service.authorizeCardholder(cardholder.grant);
        this.cardholder = cardholder;
      }

      // card
      if (this.card_id) {
        card = { id: this.card_id };
      }

      if (!card?.id) {
        const createCardResponse = await this.service.createCard({
          ...card,
          cardholder_id: cardholder.id,
        });

        card = createCardResponse.body;
      }
      this.card = card;

      const jobs = [
        {
          cardholder_id: cardholder?.id,
          card_id: card?.id,
          status: 'REQUESTED',
          account: {
            merchant_site_id: site.id,
            cardholder_id: cardholder?.id,
            account_link: creds,
            customer_key: `${site.id}${cardholder?.cuid}`,
          },
        },
      ];
      const singleSiteJobResponse = await this.service.createJobs(jobs);

      const job = singleSiteJobResponse.body[0];
      job.site_id = site.id;
      job.site = site;
      const newJobs = [...this.jobs];
      newJobs.push(job);
      this.updateJobs(newJobs);
      return job;
    } catch (error: any) {
      throw error;
    }
  }
}
