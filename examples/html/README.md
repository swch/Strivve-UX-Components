# HTML Example

## Getting Started
```
npm install
```
```
npm start
```

## Mount Component
Example file: `/index.html`

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
    }
  });

</script>
```

