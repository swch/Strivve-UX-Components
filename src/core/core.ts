import { EncryptionUtility } from '../cardsavr/CardsavrSessionCrypto';
import { CardBody, Card, Job, StrivveServiceInterface } from '../types';
import AccountLinkCore, { AccountLinkCoreOption } from './accountLink';
import SelectSiteCore, { SelectSiteCoreOptions } from './selectSite';

export interface StrivveCoreOptions {
  service: StrivveServiceInterface;
  card_id?: string;
  card?: CardBody;
  address?: any;
  reset?: boolean;
  eventHandler?: (action: any) => void;
  mount?: StrivveCoreMount;
}

export type CreateAccountLinkOptions = Omit<
  AccountLinkCoreOption,
  'service' | 'onSubmit'
>;

export enum StrivveCoreMount {
  ACCOUNT_LINK = 'account_link',
  SELECT_SITE_LIST = 'select_site_list',
  SELECT_SITE_CAROUSEL = 'select_site_carousel',
  SELECT_SITE_LINKED = 'select_site_linked',
  INTRO = 'intro',
}

export type CreateSelectSiteOptions = Omit<SelectSiteCoreOptions, 'service'>;

export type StrivveCoreState = {
  mount: StrivveCoreMount;
};

export default class StrivveCore {
  public service: StrivveServiceInterface;
  private cardholder: any;
  private card?: CardBody | Card | any;
  private card_id?: string;
  private initialMount?: StrivveCoreMount;
  public jobs: any[] = [];
  public history: string[] = [];
  public selectSiteCore?: SelectSiteCore;
  public accountLinkCore?: AccountLinkCore;
  private subscriber: Function[] = [];
  public state: StrivveCoreState = {
    mount: StrivveCoreMount.SELECT_SITE_CAROUSEL,
  };
  public eventHandler?: (action: any) => void = () => {};

  constructor({
    service,
    card_id,
    card,
    reset,
    eventHandler,
    mount,
  }: StrivveCoreOptions) {
    this.service = service;

    this.card_id = card_id;
    this.card = card;
    this.state.mount = mount || StrivveCoreMount.SELECT_SITE_CAROUSEL;

    this.history = [this.state.mount];

    this.initialMount = this.state.mount;

    if (reset) {
      sessionStorage.clear();
    }

    this.eventHandler = eventHandler;

    this.getJobs();

    this.getCard();
  }

  async getCard() {
    const cvvStorage = sessionStorage.getItem('cvv');
    if (!this.card?.cvv && cvvStorage && this.card) {
      this.card.cvv = EncryptionUtility.decrypt(cvvStorage);
    }
  }

  public subscribe(func: Function) {
    this.subscriber.push(func);
    this.notifyState();
  }

  public sendEvent(action: any) {
    if (this.eventHandler) {
      this.eventHandler(action);
    }
  }

  public setState(value: Partial<StrivveCoreState>) {
    this.state = {
      ...this.state,
      ...value,
    };
    this.notifyState();
  }

  private notifyState() {
    this.subscriber.forEach((item) => item(this.state));
  }

  setMount(mount: StrivveCoreMount) {
    this.setState({ mount });
  }

  push(mount: StrivveCoreMount) {
    this.history.push(mount);
    this.setState({ mount });
  }

  resetRoute() {
    this.history =
      this.initialMount === StrivveCoreMount.INTRO
        ? [StrivveCoreMount.INTRO]
        : [StrivveCoreMount.INTRO, StrivveCoreMount.SELECT_SITE_CAROUSEL];
    this.setState({ mount: this.initialMount });
  }

  goBack(): boolean {
    this.history.pop();
    const path = this.history[this.history.length - 1];
    if (path) {
      this.setMount(path as any);
      return true;
    } else {
      return false;
    }
  }

  getJobs(): Job[] {
    const local = sessionStorage.getItem('jobs');
    if (local) {
      try {
        const newJobs = JSON.parse(local);
        this.jobs = newJobs;

        return newJobs;
      } catch (err) {}
    }

    return [];
  }

  private updateJobs(jobs: any) {
    this.jobs = jobs;
    sessionStorage.setItem('jobs', JSON.stringify(jobs));
    this.selectSiteCore?.setState({ jobs });
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
      cvv: this.card?.cvv,
      onMessage: (id, messageg) => this.onMessage(id, messageg),
      onSubmit: (v: any, meta: any) => this.startJob(v, meta),
      service: this.service,
    });

    return this.accountLinkCore;
  }

  createSelectSite(options?: CreateSelectSiteOptions): SelectSiteCore {
    const jobs = this.getJobs();
    this.selectSiteCore = new SelectSiteCore({
      ...options,
      service: this.service,
      jobs,
    });
    return this.selectSiteCore;
  }

  uniqueByProperty<T>(arr: T[], property: keyof T): T[] {
    const uniqueArray: T[] = [];

    arr.forEach((item) => {
      const existingIndex = uniqueArray.findIndex(
        (uItem) => uItem[property] === item[property]
      );
      if (existingIndex === -1) {
        uniqueArray.push(item);
      }
    });

    return uniqueArray;
  }

  async cancelJob() {
    const jobs = this?.jobs || [];
    const item = this.jobs?.[jobs.length - 1];

    if (!item?.termination_type) {
      this.service.cancelJob(item.id);
      this.onMessage(item.id, {
        status: 'CANCELLED',
        termination_type: 'CANCELLED',
      });
      this.accountLinkCore?.query?.removeListeners(item.id);
    }
  }

  async startJob(
    creds: { [key: string]: any },
    meta?: { site: any; cvv?: number }
  ) {
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
        const address = card?.address;
        if (address) {
          address.cardholder_id = cardholder.id;
        }
        const createCardResponse = await this.service.createCard({
          ...card,
          cvv: meta?.cvv,
          cardholder_id: cardholder.id,
          address,
        });

        card = createCardResponse.body;
      }
      this.card = card;

      if (meta?.cvv && this.card) {
        this.card.cvv = meta?.cvv;
        const cvvEncrypted = EncryptionUtility.encrypt(String(meta.cvv || ''));
        sessionStorage.setItem('cvv', cvvEncrypted);
      }

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
      const findIndex = newJobs.findIndex((item) => item.site_id === site.id);
      if (findIndex >= 0) {
        newJobs[findIndex] = job;
      } else {
        newJobs.push(job);
      }
      this.updateJobs(newJobs);
      return job;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }
}
