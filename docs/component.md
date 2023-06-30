# Component

Contains functions to render components on the website.

```js
const component = Strivve.createComponent({ core });
```

## Params

| name       | params                   | description |
| ---------- | ------------------------ | ----------- |
| core       | [core instance](core.md) | required    |
| appearance | `Appearance`             | optional    |

## Appearance

The `Appearance` type is an interface that specifies the appearance options for rendering different UI elements.

```json
{
  layout: {
    logoImageUrl: 'https://strivve.com/wp-content/uploads/2019/09/StrivveLogoLG.png',
    appName: 'Strivve',
  },
  variables: {
    colorPrimary: '#008BD9',
    colorSecondary: '#6BBF00',
    fontFamily: 'sans-serif',
    colorText: '#000000',
    colorTextSecondary: '#565656',
    colorBorder: 'lightgray',
  },
  variables: {
    colorPrimary: '#008BD9',
    colorSecondary: '#6BBF00',
    fontFamily: 'sans-serif',
    colorText: '#000000',
    colorTextSecondary: '#565656',
  },
  elements: {
    input: {
      padding: '12px',
      border: '1px solid #D9D9D9',
      borderRadius: '5px',
      marginBottom: '12px',
      width: '-webkit-fill-available',
      ':focus-visible': {
        outlineColor: '#6BBF00',
      }
    },
    button: {
      background: 'var(--colorPrimary)',
      borderRadius: '6px',
      padding: '10px 12px',
      color: 'white',
      width: '100%',
      cursor: 'pointer',
      border: '2px solid var(--colorPrimaryDark)',
      '&:hover': {
        background: 'var(--colorPrimaryDark)'
      },
      '&:disabled': {
        background: 'gray',
        border: '2px solid gray',
      },
      ...
    }
  }
}
```

## Properties

| Name      | Params                                                                                                                                 | Description                                     |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| layout    | `logoImageUrl?: string`                                                                                                                | An object representing the layout properties.   |
| variables | `colorPrimary?: string`<br>`colorSecondary?: string`<br>`fontFamily?: string`<br>`colorText?: string`<br>`colorTextSecondary?: string` | An object representing the variable properties. |

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

| Name        | Type                                          | Description                                                                                                                |
| ----------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `filter`    | `APIFilter` (optional)                        | An object representing the filter criteria.                                                                                |
| `multiple`  | `boolean` (optional)                          | A boolean value indicating whether multiple site selections are allowed.                                                   |
| `view`      | `'list'                                       | 'carousel'` (optional)                                                                                                     | The view mode for the site selection, either `'list'` or `'carousel'`. |
| `onSubmit`  | `(values: any) => void` (optional)            | A callback function to be executed when the selection is submitted. It receives the selected values as input.              |
| `onClose`   | `() => void` (optional)                       | A callback function to be executed when the selection view is closed.                                                      |
| `subscribe` | `(state: SelectSiteState) => void` (optional) | A callback function that subscribes to changes in the state of the site selection. It receives the updated state as input. |
