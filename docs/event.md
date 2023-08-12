# Events
```js
    Strivve.mountLinkingJourney({
      element_id: 'full',
      api_instance: 'customer-dev',
      card: {
        pan: '4111111111111111',
        expiration_month: '2',
        expiration_year: '24',
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
      eventHandler: (data) => {
        console.log('event', data);
      },
    });
```

| component             | action  | site           |
|-----------------------|---------|----------------|
| select_site_carousel  | view    |            |
| select_site_carousel  | browse_all    |            |
| select_site_carousel  | swipe   |            |
| select_site_carousel  | select  | e.g: amazon.com|
| select_site_list      | view    |            |
| select_site_list      | scroll  |            |
| select_site_list      | back    |            |
| select_site_list      | select  | e.g: amazon.com|
| select_site_search    | view    |            |
| select_site_search    | scroll  |            |
| select_site_search    | close   |            |
| select_site_search    | select  | e.g: amazon.com|
| account_link_form     | view    | e.g: amazon.com|
| account_link_form     | submit  | e.g: amazon.com|
| account_link_form     | close  | e.g: amazon.com|
| cvv_form_modal        | view    | e.g: amazon.com|
| cvv_form_modal        | submit  | e.g: amazon.com|
| cvv_form_modal        | close  | e.g: amazon.com|
| pending_form_modal    | view    | e.g: amazon.com|
| pending_form_modal    | submit  | e.g: amazon.com|
| pending_form_modal    | close  | e.g: amazon.com|
| account_link_progress| view    | e.g: amazon.com|
| account_link_progress| close  | e.g: amazon.com|
| status_modal         | view    | e.g: amazon.com|
| status_modal         | close  | e.g: amazon.com|
