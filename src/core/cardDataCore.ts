// import { CardholderQuery } from '@strivve/strivve-sdk/lib/cardsavr/CardsavrHelper';
// import { Job, MerchantSite, StrivveServiceInterface } from '../types';

export interface CardDataCoreOptions {
  onSubmit: Function;
}

export interface Field {
  name: string;
  value?: any;
  type?: string;
  label?: string;
  required?: boolean;
  secret?: boolean;
  maxLength?: number;
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

export const initialCardDataState = {
  values: {},
  valid: true,
  loading: true,
  linking: false,
  success: false,
  failed: false,
  submitting: false,
  fields: [],
};

export default class CardDataCore {
  state: CardDataState = initialCardDataState;
  fields: Field[] = [];
  displayGrid: any[] = [];
  private onSubmit: Function;
  private subscriber: Function = () => {};

  constructor({
                onSubmit,
              }: CardDataCoreOptions) {
    // fields
    const emailField : Field = {
      name: "email",
      value: '',
      label: "Email Address",
      type: 'email',
      required: true,
      secret: false,
    }
    const phoneNumField : Field = {
      name : "phone_number",
      value: '',
      label: "Phone Number",
      type: 'tel',
      required: true,
      secret: false,
    }
    const nameOnCardField : Field = {
      name : "name_on_card",
      value: '',
      label: "Name On Card",
      type: 'text',
      required: true,
      secret: false,
    }
    const cardNumberField : Field = {
      name : "pan",
      value: '',
      label: "CardNumber",
      type: 'password',
      required: true,
      secret: true,
      maxLength: 16
    }
    const expDateField : Field = {
      name : "expiration_date",
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
      type: 'number',
      required: true,
      secret: false,
      maxLength: 4
    }
    const firstNameField : Field = {
      name : "first_name",
      value: '',
      label: "First Name",
      type: 'text',
      required: true,
      secret: false,
    }
    const lastNameField : Field = {
      name : "last_name",
      value: '',
      label: "Last Name",
      type: 'text',
      required: true,
      secret: false,
    }
    const billingAddressLabel: Field = {
      name : "billing_address_label",
      value: '',
      label: "Billing Address",
      type: 'label',
      required: true,
      secret: false,
    }
    const billingAddressField : Field = {
      name : "address1",
      value: '',
      label: "Billing Address",
      type: 'text',
      required: true,
      secret: false,
    }
    const billingAddressLine2Field : Field = {
      name : "address2",
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
    const stateField : Field = {
      name : "state",
      value: '',
      label: "State",
      type: 'text',
      required: true,
      secret: false,
      maxLength: 2
    }
    const countryField : Field = {
      name : "country",
      value: 'US',
      label: "Country",
      type: 'text',
      required: true,
      secret: false,
      maxLength: 2
    }
    const postalCodeField : Field = {
      name : "postal_code",
      value: '',
      label: "Zip",
      type: 'text',
      required: true,
      secret: false,
      maxLength: 10
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
    this.fields.push(postalCodeField);

    // create a grid array for display
    // grid is an array of rows.
    // Each row may have an array of multiple objects which will become columns.
    // const grid = [];
    // grid.push( [ countryField ] );
    // grid.push( [ cardNumberField ] );
    // grid.push( [ expMonthField, expYearField, cvvField ] );
    // grid.push( [ nameOnCardField ] );
    // grid.push( [ billingAddressLabel ] );
    // grid.push( [ billingAddressField ] );
    // grid.push( [ billingAddressLine2Field ] );
    // grid.push( [ cityField ] );
    // grid.push( [ stateField, postalCodeField ] );
    //
    // this.displayGrid = grid;

    this.onSubmit = onSubmit;
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
    console.log("cardDataCore-> submit() called");
    const pending = this.state.pending;
    try {
      if ( pending ) {
        this.updateState({ submitting: true });
        this.updateState({ pending: null });
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
