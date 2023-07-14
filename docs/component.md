# Component

Contains functions to render components on the website.

```js
const component = Strivve.createComponent({ core, appearance, localization });
```

## Params

| name         | params                   | description |
| ------------ | ------------------------ | ----------- |
| core         | `core instance` | required    |
| appearance   | `Appearance`             | optional    |
| localization | `Localization`           | optional    |

## Localization

Interface representing localization options.

### Properties

| Name                   | Type   | Description                                                            |
| ---------------------- | ------ | ---------------------------------------------------------------------- |
| selectSiteTitle        | string | Optional. The title to display when selecting a site.                  |
| selectSiteTitleHaveJob | string | Optional. The title to display when selecting a site and having a job. |
| accountLinkTitle       | string | Optional. The title for the account link.                              |
| accountLinkDescription | string | Optional. The description for the account link.                        |

## Method

| name                | params                                                                             |
| ------------------- | ---------------------------------------------------------------------------------- |
| mountAccountLink    | (id: string, options: [mountAccountLinkViewOptions](#mountAccountLinkViewOptions)) |
| unmountAccountLink  | (id: string)                                                                       |
| mountSelectSite     | (id: string, options?: mountSelectSiteViewOptions)                                 |
| unmountSelectSite   | (id: string)                                                                       |
| mountLinkingJourney | (id: string, options: [MountFullAccountLinkOptions](#MountFullAccountLinkOptions)) |

## mountAccountLinkViewOptions <a href="#mountAccountLinkViewOptions" id="mountAccountLinkViewOptions"></a>

| Name          | Type                                           | Description                                                                                                                   |
| ------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `site_id`     | `string`                                       | The ID of the site to link the account to.                                                                                    |
| `quick_start` | `boolean` (optional)                           | A boolean value indicating whether to enable quick start mode.                                                                |
| `subscribe`   | `(state: AccountLinkState) => void` (optional) | A callback function that subscribes to changes in the state of the account link view. It receives the updated state as input. |
| `onSubmit`    | `(values: any) => void` (optional)             | A callback function to be executed when the account link is submitted. It receives the entered values as input.               |
| `onCancel`    | `() => void` (optional)                        | A callback function to be executed when the account link view is canceled.                                                    |

## mountSelectSiteViewOptions <a href="#mountSelectSiteViewOptions" id="mountSelectSiteViewOptions"></a>

| Name       | Type                                    | Description                                                                                                               |
| ---------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `filter`   | `{ [key: string]: string }` (optional)                  | An object representing the filter criteria https://swch.github.io/slate/?javascript#get-merchant-site                                                                              |
| `multiple` | `boolean` (optional)                    | A boolean value indicating whether multiple site selections are allowed.                                                   |
| `view`     | `'list' \| 'carousel'` (optional)       | The view mode for the site selection, either `'list'` or `'carousel'`.                                                     |
| `onSubmit` | `(values: any) => void` (optional)      | A callback function to be executed when the selection is submitted. It receives the selected values as input.              |
| `onClose`  | `() => void` (optional)                 | A callback function to be executed when the selection view is closed.                                                      |
| `subscribe`| `(state: SelectSiteState) => void` (optional) | A callback function that subscribes to changes in the state of the site selection. It receives the updated state as input. |

