import { Encryption } from '../cardsavr/CardsavrSessionCrypto';
import { CardholderQuery, CardsavrHelper } from '../cardsavr/CardsavrHelper';
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
  safe_key: string = 'strivve';
  pending: Function[] = [];
  grant?: string;
  financial_institution?: string = 'default';
  public fi_detail?: any;

  constructor({
    api_instance,
    safe_key,
    grant,
    financial_institution,
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

    this.login();
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
      this.is_login = true;

      if (this.financial_institution) {
        const fi = await this.getFinancialInstitution(
          this.financial_institution
        );
        this.fi_detail = fi;
      }
      return res;
    } catch (error: any) {
      console.log(error);
      if (window !== undefined) {
        localStorage.clear();
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

  private async waitingLogin(): Promise<boolean> {
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        if (this.is_login === true) {
          clearInterval(intervalId);
          resolve(true);
        }
      }, 100);
    });
  }

  async getSession() {
    await this.waitingLogin();
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

  async getFinancialInstitution(lookup_key: string) {
    const session = this.ch.getSession(this.username);
    const filters = {};
    const fis_response = await session.getFinancialInstitutions(filters);
    const fi = fis_response.body;
    console.log('===', fi);
    return fi?.[0];
  }
}

export default StrivveService;
