import { Encryption } from "@strivve/strivve-sdk/lib/cardsavr/CardsavrSessionCrypto";
import { CardholderQuery, CardsavrHelper } from '@strivve/strivve-sdk/lib/cardsavr/CardsavrHelper';
import {
  MerchantSite,
  StrivveServiceInterface,
  APIFilter,
  StrivveServiceOptions,
  JobBody,
  CardBody,
  CardholderBody,
  PostCredsBody,
} from '../types';

class StrivveService implements StrivveServiceInterface {
  ch: CardsavrHelper;
  username: string = 'strivve';
  api_instance: string = 'strivve';
  is_login: boolean = false;
  is_error: boolean = false;
  public safe_key: string = 'strivve';
  pending: Function[] = [];
  grant?: string;
  financial_institution?: string;
  public fi_detail?: any;
  queue_name_override?: string;

  constructor({
    api_instance,
    safe_key,
    grant,
    financial_institution,
    queue_name_override
  }: StrivveServiceOptions) {
    this.ch = CardsavrHelper.getInstance();
    this.api_instance = api_instance;
    if (safe_key) {
      this.safe_key = safe_key;
    }

    if (grant) {
      this.grant = grant;
    }

    if (financial_institution) {
      this.financial_institution = financial_institution;
    }

    if ( queue_name_override ) {
      this.queue_name_override = queue_name_override;
    }
  }

  async login() {
    try {
      const config = await this.buildConfigFromLocalSettings(this.api_instance);
      this.ch.setAppSettings(
        config.cardsavr_server,
        config.name,
        config.key,
        false,
        undefined,
        undefined,
        false
      );
      this.username = config.username;
      const res = await this.ch.loginAndCreateSession(
        config.username,
        config.password
      );

      if (this.financial_institution) {
        console.log("FI look up key = "+this.financial_institution);
        const fi = await this.getFinancialInstitution(
          this.financial_institution
        );
        this.fi_detail = fi;
        console.log("FI Detail = "+JSON.stringify(this.fi_detail, null, 2));
      }

      this.is_login = true;
      return res;
    } catch (error: any) {
      this.is_error = true;
      if (window !== undefined) {
        sessionStorage.clear();
        window.location.reload();
      }
      throw new Error(error.message);
    }
  }

  setSafeKey(key: string) {
    this.safe_key = key;
  }

  private async buildConfigFromLocalSettings(instance: string | undefined) {
    try {
      const nodes = window.location.host.split('.');
      if (nodes.length === 4) {
        nodes.shift();
      }
      const cardsavr_server = instance
        ? `https://csapi.${instance}.cardupdatr.app/`
        : `https://csapi.${nodes.join('.')}/`;
      const config_server = instance
        ? `https://${instance}.cardupdatr.app/config.json`
        : `https://${window.location.host}/config.json`;
      console.log(
        `config_server: ${config_server}, cardsavr_server: ${cardsavr_server}`
      );
      const config = await (await fetch(config_server)).json();

      if (Array.isArray(config)) {
        return {
          ...(await Encryption.decryptResponse(config[0], {
            encrypted_body: config[1],
          })),
          cardsavr_server,
        };
      }
    } catch (err) {
      return null;
    }
    return null;
  }

  async init(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const intervalId = setInterval(() => {
        if (this.is_login) {
          clearInterval(intervalId);
          resolve(true);
        }

        if (this.is_error) {
          clearInterval(intervalId);
          reject('Session expired');
        }
      }, 100);
    });
  }

  async getSession() {
    await this.init();
    const session = this.ch.getSession(this.username);
    return session;
  }

  async getMerchantSite(id: string): Promise<MerchantSite> {
    const session = await this.getSession();
    const res = await session?.getMerchantSites({
      ids: id,
    });

    return res?.body?.[0];
  }

  async getMerchantSites(filters?: APIFilter): Promise<MerchantSite[]> {
    const session = await this.getSession();

    const res = await session?.getMerchantSites(filters || {}, {
      page: 1,
      page_length: 9999,
      sort: 'name',
      is_descending: false,
    });

    return res?.body || [];
  }

  createJobs(data: JobBody[]) {
    const session = this.ch.getSession(this.username);
    return session?.createSingleSiteJobs(data, this.safe_key);
  }

  createCardholder(data: CardholderBody) {
    const session = this.ch.getSession(this.username);
    return session?.createCardholder(data, this.safe_key);
  }

  createCard(data: CardBody) {
    const session = this.ch.getSession(this.username);
    return session?.createCard(data, this.safe_key);
  }

  authorizeCardholder(grant: string) {
    const session = this.ch.getSession(this.username);
    return session?.authorizeCardholder(grant);
  }

  createCardholderQuery(job_id: string): CardholderQuery {
    return this.ch.createCardholderQuery(this.username, Number(job_id));
  }

  postCreds(body: PostCredsBody) {
    return this.ch.postCreds({
      username: this.username,
      safe_key: this.safe_key,
      ...body,
    } as any);
  }

  async cancelJob(job_id: number) {
    try {
      const session= await this.getSession();
      return await session.updateSingleSiteJob(
        job_id,
        { status: 'CANCEL_REQUESTED' }
      );
    } catch (err) {
      console.error(err);   // TODO: This is a problem. How to propagate this error ?
    }
  }

  async getFinancialInstitution(lookup_key: string) {
    const session = this.ch.getSession(this.username);
    const filters = { lookup_key };
    const fis_response = await session.getFinancialInstitutions(filters);
    const fi = fis_response.body;
    return fi?.[0];
  }
}

export default StrivveService;
