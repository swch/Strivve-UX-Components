import { CardholderQuery } from '@strivve/strivve-sdk/lib/cardsavr/CardsavrHelper';
import { Job, MerchantSite, StrivveServiceInterface } from '../types';

export interface AccountLinkCoreOption {
  site_id: string;
  onSubmit: Function;
  service: StrivveServiceInterface;
  quick_start?: boolean;
  job?: Job;
  cvv?: string;
  phone_number?: string;
  email?: string;
  onMessage?: (id: string, values: any) => void;
}

export interface Field {
  name: string;
  value?: any;
  type?: string;
  label?: string;
  required?: boolean;
  secret?: boolean;
}

export interface ErrorField {
  name: string;
  message: string;
}

export interface AccountLinkState {
  values: { [key: string]: any };
  valid: boolean;
  loading: boolean;
  submitting: boolean;
  linking: boolean;
  success: boolean;
  failed: boolean;
  job?: Job;
  message?: any;
  pending?: any;
  errors?: ErrorField[];
  fields: Field[];
  sparse_data_fields: Field[];
  percent: number;
  missing_fields: string[];
  cvv?: string;
  phone_number?: string;
  email?: string;
}

export const initialStateAccountLink = {
  values: {},
  valid: true,
  loading: true,
  linking: false,
  success: false,
  failed: false,
  submitting: false,
  fields: [],
  sparse_data_fields: [],
  missing_fields: [],
  percent: 0,
};

export const failedStatus = [
  'PROCESS_FAILURE',
  'SITE_INTERACTION_FAILURE',
  'USER_DATA_FAILURE',
];

export default class AccountLinkCore {
  service: StrivveServiceInterface;
  site?: MerchantSite = undefined;
  state: AccountLinkState = initialStateAccountLink;
  fields: Field[] = [];
  query?: CardholderQuery;
  private onSubmit: Function;
  private onMessage?: (id: string, values: any) => void;
  private subscriber: Function = () => {};
  private intervalPercent?: ReturnType<typeof setInterval>;

  constructor({
    site_id,
    quick_start,
    onSubmit,
    onMessage,
    service,
    cvv,
    phone_number,
    email,
    job,
  }: AccountLinkCoreOption) {
    this.service = service;
    this.state.cvv = cvv;
    this.state.phone_number = phone_number;
    this.state.email = email;
    if (job) {
      this.createQuery(job);
      this.updateState({
        cvv,
        phone_number,
        email,
        job,
        linking: true,
        loading: false,
      });
    }

    this.onSubmit = onSubmit;
    this.onMessage = onMessage;
    this.getSite(site_id, quick_start, job);
  }

  async getSite(id: string, quick_start?: boolean, job?: any) {
    try {
      const site = await this.service.getMerchantSite(id);
      this.site = site;
      this.fields =
        site?.account_link
          .filter((item) => item.type === 'initial_account_link')
          .map((item) => ({
            name: item.key_name,
            value: '',
            label: item.label,
            type: item.secret ? 'password' : 'text',
            required: true,
            secret: item.secret,
          })) || [];

      this.updateState({
        linking: job ? true : Boolean(quick_start),
        loading: false,
        job,
        fields: this.fields,
      });
      if (quick_start) {
        this.submit();
      }
    } catch (err) {}
  }

  public change(name: string, value: any) {
    if (!this.state.values) {
      this.state.values = {};
    }
    this.state.values = {
      ...this.state.values,
      [name]: value,
    };
    this.state.errors = [];
    this.notifyForm();
  }

  public async submitCvv(card_id: string) {
    this.updateState({
      cvv: this.state.values.cvv !== undefined ? this.state.values.cvv : this.state.cvv,
      phone_number: this.state.values.phone_number !== undefined ? this.state.values.phone_number : this.state.phone_number,
      email: this.state.values.email !== undefined ? this.state.values.email : this.state.email
    });

    const body : any = {};
    this.state.missing_fields?.forEach( field => {
      if ( field === 'cvv' ) {
        body['cvv'] = this.state.cvv!;
      }
    })

    const response = await this.service.updateCard(card_id, body, this.service.safe_key);
    console.log("Update card response", response);

    delete this.state.values.cvv;
    delete this.state.values.phone_number;
    delete this.state.values.email;

    return this.submit();
  }

  public async submit() {
    const job = this.state.job;
    const pending = this.state.pending;
    try {
      if (job && pending) {
        this.updateState({ submitting: true });
        await this.service.postCreds({
          job_id: job.id,
          envelope_id: pending.envelope_id,
          account_link: this.state.values,
        });
        this.updateState({ pending: null, linking: true });
      } else {
        this.updateState({ submitting: true, percent: 0 });
        const job = await this.onSubmit(this.state.values, {
          site: this.site,
          cvv: this.state.cvv,
          phone_number: this.state.phone_number,
          email: this.state.email
        });
        this.updateState({
          job,
          submitting: false,
          linking: true,
          values: {},
        });
        this.createQuery(job);
        this.createIntervalPercent();
      }
    } catch (error: any) {
      const err = error.response?.body[0]?._errors || [
        { name: 'failed', message: 'Failed' },
      ];
      this.updateState({ errors: err, submitting: false });
    }
  }

  createIntervalPercent() {
    this.intervalPercent = setInterval(() => {
      if (!this.state.pending) {
        const percent = this.state.percent + 1;
        if (percent >= 95) {
          if (this.intervalPercent) {
            clearInterval(this.intervalPercent);
          }
        } else {
          this.updateState({ percent });
        }
      }
    }, 1000);
  }

  uniqueBy(arr: any, prop: string) {
    return arr.reduce((acc: any, obj: any) => {
      if (!acc.some((x: any) => x[prop] === obj[prop])) {
        acc.push(obj);
      }
      return acc;
    }, []);
  }

  createQuery(job: any) {
    const query = this.service.getCardholderQuery(job.cardholder_id);
    const statusHandler = (data: any) => {
      const message = data.message || data.error_message;
      this.onMessage?.(data.job_id, message);

      const isAuthComplete = message.auth_percent_complete === 100;
      const percent =
        this.state.percent > message.auth_percent_complete
          ? this.state.percent
          : message.auth_percent_complete;

      if (message?.termination_type || data?.type === 'error' || isAuthComplete) {
        if (failedStatus.includes(message?.termination_type)) {
          this.updateState({
            percent,
            message,
            linking: false,
            failed: true,
            pending: null,
            loading: false,
          });
        } else {
          this.updateState({
            percent,
            message,
            linking: false,
            success: true,
            pending: null,
            loading: false,
          });
        }

        if ( message?.percent_complete === 100 || message?.termination_type ) {
          console.log("**********************************");
          console.log(`Removing listeners (statusHandler) for job ID = ${job.id}`);
          query.removeListeners(job.id);
          console.log("**********************************");
        }

        if (this.intervalPercent) {
          clearInterval(this.intervalPercent);
        }
      } else {
        this.updateState({
          percent,
          message,
          linking: true,
          submitting: false,
          loading: false,
        });
      }
    };

    const pendingHandler = (data: any) => {
      const pending = data;
      const message = data.message || data.error_message;

      this.fields = this.uniqueBy(pending.account_link || [], 'key_name').map(
        (item: any) => ({
          name: item.key_name,
          value: '',
          label: item.label,
          type: item.secret ? 'password' : 'text',
          required: true,
        })
      );
      this.updateState({
        message,
        pending,
        linking: false,
        submitting: false,
        fields: this.fields,
      });

      if ( message?.percent_complete === 100 || message?.termination_type ) {
        console.log("**********************************");
        console.log(`Removing listeners (pendingHandler) for job ID = ${job.id}`);
        query.removeListeners(job.id);
        console.log("**********************************");
      }
    };

    query.addListener(job.id, statusHandler, 'job_status');
    query.addListener(job.id, pendingHandler, 'pending');

    this.query = query;
  }

  public subscribe(func: Function) {
    this.subscriber = func;
    this.notifyForm();
  }

  private updateState(value: Partial<AccountLinkState>) {
    this.state = {
      ...this.state,
      ...value,
    };

    this.notifyForm();
  }

  private notifyForm() {
    this.subscriber?.({
      ...this.state,
    });
  }
}
