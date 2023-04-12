# Service
Service contains functions that are connected to API/Backend.
```js
  const service = Strivve.createService({ api_instance: 'customer-dev' });

  const sites = await servive.getMerchantSites()
```

## Params

| name | params | description |
|---|---|---|
| element_id | string | required |
| safe_key | string | optional |
| grant | string | optional |

## Function

| name | params | 
|---|---|
| setSafeKey | string | 
| getMerchantSite | string | 
| getMerchantSites | [filter](https://swch.github.io/slate/?javascript#merchant-sites) | 
| createJob | [job](https://swch.github.io/slate/?javascript#create-single-site-job) | 
| createCardholder | [cardholder](https://swch.github.io/slate/?javascript#create-cardholder) | 
| createCard | [card](https://swch.github.io/slate/?javascript#create-card) | 
| authorizeCardholder | grant: string | 
| createCardholderQuery | job_id: string | 
| postCreds | { job_id: string, envelope_id: string, account_link: any } | 



