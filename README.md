# Strivve CX

Varying levels of customizable Javascript Components which easily drop into desktop and mobile web applications as well as native applications as reqired.

## Documentation

[https://swch.github.io/Strivve-UX-Components/](https://swch.github.io/Strivve-UX-Components/)

## Install via CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@strivve/strivve-cx"></script>
```

### Usage

```html
<body>
  <div id="account-link"></div>
</body>
<script src="https://cdn.jsdelivr.net/npm/@strivve/strivve-cx"></script>
<script>
  Strivve.mountLinkingJourney({
    element_id: 'account-link',
    api_instance: 'customer-dev',
    card: {
      pan: '4111111111111111',
      cvv: '321',
      expiration_month: 2,
      expiration_year: 24,
      name_on_card: 'Jane',
    },
  });
</script>
```

## Install as package

```bash
npm install @strivve/strivve-cx
```

### Usage

```js
import Strivve from '@strivve/strivve-cx';

Strivve.mountLinkingJourney({
  element_id: 'account-link',
  api_instance: 'customer-dev',
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

## Config

| name         | params                                                                       | description |
| ------------ | ---------------------------------------------------------------------------- | ----------- |
| element_id   | string                                                                       | required    |
| api_instance | string                                                                       | required    |
| card         | CardConfig                                                                   | optional    |
| card_id      | string                                                                       | optional    |
| appearance   | Appearance                                                                   | optional    |
| localization | Localization                                                                 | optional    |
| grant        | string                                                                       | optional    |
| select_site  | [mountSelectSiteViewOptions](docs/component.md#mountSelectSiteViewcomponent) | optional    |
| account_link | [mountAccountLinkViewOptions](docs/component.md#mountAccountLinkViewoptions) | optional    |

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
| address2     | string | optional  |
| state     | string | required  |
| subnational     | string | required  |
| is_primary     | boolean | required  |
| country     | string | optional  |
| postal_other     | string | optional  |




## Service, Core and Component

We can use parts of the functions and components.

- [Service](docs/service.md)
- [Core](docs/core.md)
- [Component](docs/component.md)

```js
const service = Strivve.createService({ api_instance: 'customer-dev' });

const core = Strivve.createCore({
  service,
  card: {
    pan: '4111111111111111',
    cvv: '321',
    expiration_month: 2,
    expiration_year: 24,
    name_on_card: 'Jane',
  },
});

const component = Strivve.createComponent({ core });

component.mountAccountLinkView('account-link', {
  site_id: '1',
});

component.mountSelectSiteView('select-sites', {
  submit: (selected) => {
    alert(selected.map((item) => item.name).join(', '));
  },
});
```
