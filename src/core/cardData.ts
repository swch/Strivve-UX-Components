import { StrivveServiceInterface } from '../types';

export interface CardDataCoreOptions {
  // onSubmit: Function;
  service: StrivveServiceInterface;
  // cvv?: string;
  // onMessage?: (id: string, values: any) => void;
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

export interface CardDataState {
  values: { [key: string]: any };
  valid: boolean;
  loading: boolean;
  submitting: boolean;
  success: boolean;
  failed: boolean;
  message?: any;
  pending?: any;
  errors?: ErrorField[];
  fields: Field[];
}

export const initialStateCardData = {
  values: {},
  valid: true,
  loading: true,
  linking: false,
  success: false,
  failed: false,
  submitting: false,
  fields: [],
  percent: 0,
};

export default class CardDataCore {
  service: StrivveServiceInterface;
  state: CardDataState = initialStateCardData;
  fields: Field[] = [];
  // private onSubmit: Function;
  // private onMessage?: (id: string, values: any) => void;
  private subscriber: Function = () => {};

  constructor({
                service,
              }: CardDataCoreOptions) {
    this.service = service;

    // fields
    const emailField : Field = {
      name: "email",
      value: '',
      label: "Email Address",
      type: 'text',
      required: true,
      secret: false,
    }
    const phoneNumField : Field = {
      name : "phoneNumber",
      value: '',
      label: "Phone Number",
      type: 'text',
      required: true,
      secret: false,
    }
    const nameOnCardField : Field = {
      name : "nameOnCard",
      value: '',
      label: "Name On Card",
      type: 'text',
      required: true,
      secret: false,
    }
    const cardNumberField : Field = {
      name : "cardNumber",
      value: '',
      label: "CardNumber",
      type: 'password',
      required: true,
      secret: true,
    }
    const expDateField : Field = {
      name : "expDate",
      value: '',
      label: "Exp. Date",
      type: 'text',
      required: true,
      secret: false,
    }
    const cvvField : Field = {
      name : "cvv",
      value: '',
      label: "CVV",
      type: 'text',
      required: true,
      secret: false,
    }
    const firstNameField : Field = {
      name : "firstName",
      value: '',
      label: "First Name",
      type: 'text',
      required: true,
      secret: false,
    }
    const lastNameField : Field = {
      name : "lastName",
      value: '',
      label: "Last Name",
      type: 'text',
      required: true,
      secret: false,
    }
    const billingAddressField : Field = {
      name : "billingAddress",
      value: '',
      label: "Billing Address",
      type: 'text',
      required: true,
      secret: false,
    }
    const billingAddressLine2Field : Field = {
      name : "billingAddressLine2",
      value: '',
      label: "Billing Address Line 2",
      type: 'text',
      required: false,
      secret: false,
    }
    const cityField : Field = {
      name : "city",
      value: '',
      label: "City",
      type: 'text',
      required: true,
      secret: false,
    }
    const countryField : Field = {
      name : "country",
      value: 'USA',
      label: "Country",
      type: 'text',
      required: true,
      secret: false,
    }
    const stateField : Field = {
      name : "State",
      value: '',
      label: "Email Address",
      type: 'text',
      required: true,
      secret: false,
    }
    const zipcodeField : Field = {
      name : "zipcode",
      value: '',
      label: "Zip",
      type: 'text',
      required: true,
      secret: false,
    }

    this.fields.push(emailField);
    this.fields.push(phoneNumField);
    this.fields.push(nameOnCardField);
    this.fields.push(cardNumberField);
    this.fields.push(expDateField);
    this.fields.push(cvvField);
    this.fields.push(firstNameField);
    this.fields.push(lastNameField);
    this.fields.push(billingAddressField);
    this.fields.push(billingAddressLine2Field);
    this.fields.push(cityField);
    this.fields.push(countryField);
    this.fields.push(stateField);
    this.fields.push(zipcodeField);

    // this.onSubmit = onSubmit;
    // this.onMessage = onMessage;
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

  public async submit() {
    const pending = this.state.pending;
    try {
      if ( pending) {
        this.updateState({ submitting: true });
      } else {
        this.updateState({
          submitting: false,
          values: {},
        });
      }
    } catch (error: any) {
      const err = error.response?.body[0]?._errors || [
        { name: 'failed', message: 'Failed' },
      ];
      this.updateState({ errors: err, submitting: false });
    }
  }

  uniqueBy(arr: any, prop: string) {
    return arr.reduce((acc: any, obj: any) => {
      if (!acc.some((x: any) => x[prop] === obj[prop])) {
        acc.push(obj);
      }
      return acc;
    }, []);
  }

  public subscribe(func: Function) {
    this.subscriber = func;
    this.notifyForm();
  }

  private updateState(value: Partial<CardDataState>) {
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
