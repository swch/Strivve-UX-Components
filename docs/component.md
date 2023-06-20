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
| elements  | {}                                                                                                                                     | An object representing the elements.            |

## Method

| name                | params                                                                             |
| ------------------- | ---------------------------------------------------------------------------------- |
| mountAccountLink    | (id: string, options: [mountAccountLinkViewOptions](#mountAccountLinkViewOptions)) |
| unmountAccountLink  | (id: string)                                                                       |
| mountSelectSite     | (id: string, options?: mountSelectSiteViewOptions)                                 |
| unmountSelectSite   | (id: string)                                                                       |
| mountLinkingJourney | (id: string, options: [MountFullAccountLinkOptions](#MountFullAccountLinkOptions)) |

## mountAccountLinkViewOptions <a href="#mountAccountLinkViewOptions" id="mountAccountLinkViewOptions"></a>

| Name        | Params    | Description                                                             |
| ----------- | --------- | ----------------------------------------------------------------------- |
| site_id     | `string`  | (Optional) A string representing the merchant site ID.                  |
| quick_start | `boolean` | (Optional) A boolean representing whether to show a quick start option. |
| hide_title  | `boolean` | (Optional) A boolean representing whether to hide the title.            |

## mountSelectSiteViewOptions <a href="#mountSelectSiteViewOptions" id="mountSelectSiteViewOptions"></a>

| Name        | Params      | Description                                                                 |
| ----------- | ----------- | --------------------------------------------------------------------------- |
| filter      | `APIFilter` | (Optional) An object representing the filter criteria.                      |
| single      | `boolean`   | (Optional) A boolean representing whether to only allow one site selection. |
| submit      | `Function`  | (Optional) A function to be called when the selection is submitted.         |
| hide_search | `boolean`   | (Optional) A boolean representing whether to hide the search bar.           |
| hide_button | `boolean`   | (Optional) A boolean representing whether to hide the submit button.        |
