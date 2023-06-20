# Strivve Component

## Using Strivve Component

```html
<body>
  <div id="account-link"></div>
</body>
<script src="{url}/main.js"></script>
<script>
  Strivve.mountLinkingJourney({
    element_id: 'account-link',
    api_instance: 'customer-dev',
    card: {
      pan: '4111111111111111',
      cvv: '321',
      expiration_month: '02',
      expiration_year: '24',
      name_on_card: 'Mvick',
    },
  });
</script>
```

## Config

| name         | params                                                                       | description |
| ------------ | ---------------------------------------------------------------------------- | ----------- |
| element_id   | string                                                                       | required    |
| api_instance | string                                                                       | required    |
| card         | CardConfig                                                                   | optional    |
| card_id      | string                                                                       | optional    |
| appearance   | Appearance                                                                   | optional    |
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

| name_on_card | string | - |

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
    expiration_month: '02',
    expiration_year: '24',
    name_on_card: 'Mvick',
  },
});

const component = Strivve.createComponent({ core });

component.mountAccountLinkView('account-link', {
  site_id: '1',
  hide_title: false,
});

component.mountSelectSiteView('select-sites', {
  single: false,
  view: 'list',
  hide_search: false,
  submit: (selected) => {
    alert(selected.map((item) => item.name).join(', '));
  },
});
```
