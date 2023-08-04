# Core

Orchestration interface for processing job status, submitting credentials, functions and state for compoenent.

```js
const core = Strivve.createCore({ service, card_id });
```


```js
const core = Strivve.createCore({
  service,
  card: {
    pan: '4111111111111111',
    cvv: '321',
    expiration_month: 2,
    expiration_year: 24,
    name_on_card: 'Jane',
    address: {
      city: 'Seattle',
      postal_code: '98177',
      country: 'USA',
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane@test.com',
      phone_number: '2065555555',
      address1: 'test',
      state: 'test',
      subnational: 'WA',
      is_primary: true,
    },
  },  
});
```

## Params

| name    | params                         | description |
| ------- | ------------------------------ | ----------- |
| service | [service instance](service.md) | required    |
| card_id | string                         | optional    |
| card    | Card                           | optional    |

## Card

| name             | params | description                                                                                                                                                           |
| ---------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pan              | string | Unique Personal Account Reference number for this card, to be used for card lookup. Generated automatically from PAN, expiration date, and username if using the SDK. |
| cvv              | string | -                                                                                                                                                                     |
| expiration_month | string | -                                                                                                                                                                     |
| expiration_year  | string | -                                                                                                                                                                     |
| name_on_card     | string | -                                                                                                                                                                     |
| address     | Address | optional                                                                                                                                                                     |

## Address

| name             | params | description                                                                                                                                                           |
| ---------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------                                                                                                                                                                      |
| city     | string | required  |
| postal_code     | string | required  |
| first_name     | string | required  |
| last_name     | string | required  |
| email     | string | required  |
| phone_number     | string | required  |
| address1     | string | required  |
| state     | string | required  |
| subnational     | string | required  |
| is_primary     | boolean | required  |
| country     | string | optional  |
| postal_other     | string | optional  |


## Function

| name              | params          |
| ----------------- | --------------- |
| createAccountLink | AccountLinkCore |
| createSelectSite  | SelectSiteCore  |

## AccountLinkCore

```js
const accountLink = core.createAccountLin({ site_id: '1', quick_start: false });

// subscribe state
accountLink.subsribe((state) => {
  console.log(state);
});
```

### Params

| name        | params  | description |
| ----------- | ------- | ----------- |
| site_id     | string  | optional    |
| quick_start | boolean | optional    |

### Method and property

| name                                 | description            |
| ------------------------------------ | ---------------------- |
| state: [AccountLinkState](#state)    | state data             |
| fields: [Field](#field)[]            | list of field          |
| merchant_site: [MerchantSite](#site) | merchant site data     |
| change(name: string, value: any)     | update field state     |
| submit()                             | submit form            |
| subscribe(func: Function)            | subscribe state change |

### State <a href="#state" id="state"></a>

| name       | type                   |
| ---------- | ---------------------- |
| values     | { [key: string]: any } |
| valid      | boolean                |
| loading    | boolean                |
| submitting | boolean                |
| linking    | boolean                |
| success    | boolean                |
| failed     | boolean                |
| job        | Job                    |
| message    | Message                |

### Field <a href="#field" id="field"></a>

| name     | type    |
| -------- | ------- |
| name     | string  |
| value    | string  |
| type     | string  |
| label    | string  |
| required | boolean |

### MerchantSire <a href="#site" id="site"></a>

| name         | type          |
| ------------ | ------------- |
| id           | string        |
| name         | string        |
| account_link | AccountLink[] |
| images       | Image[]       |
