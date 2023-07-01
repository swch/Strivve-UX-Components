# Service

Service contains functions that are connected to API/Backend.

```js
const service = Strivve.createService({ api_instance: 'customer-dev' });

const sites = await servive.getMerchantSites();
```

## Params

| name     | params | description |
| -------- | ------ | ----------- |
| safe_key | string | optional    |
| grant    | string | optional    |

## Function
| Name                  | Params                                         | Return                               | Description                                                         |
| --------------------- | ---------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------- |
| setSafeKey            | `key: string`                                  | void                                 | Sets the safe key used for authentication.                          |
| getMerchantSite       | `id: string`                                    | `Promise<MerchantSite | undefined>` | Retrieves a single merchant site by its ID.                         |
| getMerchantSites      | `filters?: APIFilter`                           | `Promise<MerchantSite[]>`            | Retrieves multiple merchant sites based on optional filters.        |
| createJobs            | `body: JobBody[]`                               | `Promise<StrivveResponse<Job[]>>`     | Creates multiple jobs for merchant sites.                           |
| createCardholder      | `body: CardholderBody`                           | `Promise<StrivveResponse<Cardholder>>`| Creates a cardholder.                                               |
| createCard            | `body: CardBody`                                | `Promise<StrivveResponse<Card>>`      | Creates a card.                                                     |
| authorizeCardholder   | `grant: string`                                 | `Promise<StrivveResponse<{ cardholder_safe_key: string; cardholder: Cardholder }>>` | Authorizes a cardholder using a grant. |
| createCardholderQuery | `id: string`                                    | undefined                                   | Creates a cardholder query using an ID.                             |
| postCreds             | `body: PostCredsBody`                           | `Promise<any>`                       | Posts credentials for authentication.                               |
