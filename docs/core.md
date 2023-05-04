# Core
Orchestration interface for processing job status, submitting credentials, functions and state for compoenent.

```js
  const core = Strivve.createCore({ service, card_id });
```

## Params

| name | params | description |
|---|---|---|
| service | [service instance](service.md) | required |
| card_id | string | optional |
| card | card | optional |

## Function

| name | params | 
|---|---|
| createAccountLink | AccountLinkCore | 
| createSelectSite | SelectSiteCore | 


## AccountLinkCore

```js
  const accountLink = core.createAccountLin({ site_id: '1', quick_start: false })

  // subscribe state
  accountLink.subsribe((state) => {
    console.log(state);
  })
```

### Params
| name | params | description |
|---|---|---|
| site_id | string | optional |
| quick_start | boolean | optional |

### Method and property
| name | description | 
|---|---|
| state: [AccountLinkState](#state) | state data | 
| fields: [Field](#field)[] | list of field | 
| merchant_site: [MerchantSite](#site) | merchant site data | 
| change(name: string, value: any) | update field state | 
| submit() | submit form | 
| subscriber(func: Function) | subscribe state change | 

### State <a href="#state" id="state"></a>
| name | type | 
|---|---|
| values | { [key: string]: any } | 
| valid | boolean | 
| loading | boolean | 
| submitting | boolean | 
| linking | boolean | 
| success | boolean | 
| failed | boolean | 
| job | Job | 
| message | Message | 


### Field <a href="#field" id="field"></a>
| name | type | 
|---|---|
| name | string | 
| value | string | 
| type | string | 
| label | string | 
| required | boolean | 


### MerchantSire <a href="#site" id="site"></a>
| name | type | 
|---|---|
| id | string | 
| name | string | 
| account_link | AccountLink[] | 
| images | Image[] | 