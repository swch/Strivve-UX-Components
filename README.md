# Strivve Component

## Using Strivve Component

```html
<body>
  <div id="account-link"></div>
</body>
<script src="{url}/main.js"></script>
<script>

  Strivve.mountFullAccountLinking({
    element_id: 'account-link',
    api_instance: 'customer-dev',
    card: {
      pan: '4111111111111111',
      cvv: '321',
      expiration_month: '02',
      expiration_year: '24',
      name_on_card: 'Mvick',
    },
    style: {
      background_color: 'white',
      font_family: 'sans-serif',
      primary_color: 'black',
      text_color: '#1c1c1c',
      spacing_unit: 12,
      border_radius: 4,
      font_size: 14,
      border_color: 'lightgray',
    }
  });

</script>
```

## Config

| name | params | description |
|---|---|---|
| element_id | string | required |
| api_instance | string | required |
| card | StyleConfig | optional |
| card_id | string | optional |
| style | StyleConfig | optional |
| grant | string | optional |
| select_site | [mountSelectSiteOptions](docs/component.md#mountSelectSitecomponent) | optional |
| account_link | [MountAccountLinkOptions](docs/component.md#mountaccountlinkoptions) | optional |



## StyleConfig

| name | params | description |
|---|---|---|
| background_color | string | - |
| font_family | string | - |
| primary_color | string | - |
| text_color | string | - |
| spacing_unit | string | - |
| border_radius | string | - |
| border_color | string | - |

## Card

| name | params | description |
|---|---|---|
| pan | string | Unique Personal Account Reference number for this card, to be used for card lookup. Generated automatically from PAN, expiration date, and username if using the SDK. |
| cvv | string | - |
| expiration_month | string | - |
| expiration_year | string | - |
| name_on_card | string | - |

## Service, Core and Component
We can use parts of the functions and components.
- [Service](docs/service.md) 
- [Core](docs/core.md) 
- [Component](docs/component.md) 

```js
  const service = Strivve.createService({ api_instance: 'customer-dev' });

  const component = Strivve.createComponent({});
  
  const core = Strivve.createCore({
    service,
    component,
    card: {
      pan: '4111111111111111',
      cvv: '321',
      expiration_month: '02',
      expiration_year: '24',
      name_on_card: 'Mvick',
    }
  });

  core.mountAccountLink('account-link', {
    merchant_site_id: '1',
    hide_title: false
  });

  core.mountSelectSite('select-sites', {
    single: false,
    view: 'list',
    hide_search: false,
    submit: (selected) => {
      alert(selected.map(item => item.name).join(', '))
    },
  });
```
