# Component
Contains functions to render components on the website.
```js
  const component = Strivve.createComponent({ core });
```

## Params
| name | params | description |
|---|---|---|
| core | [core instance](core.md) | required |
| appearance | `Appearance` | optional |

## Appearance

The `Appearance` type is an interface that specifies the appearance options for rendering different UI elements. 

```json
 {
  elements: {
    button: {
      background: 'black',
      border: 'none',
      color: 'white',
      borderRadius: '0.25rem',
      padding: '0.75rem 1rem',
      cursor: 'pointer',
      '&:disabled': {
        background: 'lightgray'
      },
    },
    input: {
      padding: '0.625rem',
      boxSizing: 'border-box',
      width: '100%',
      borderColor: 'black',
      borderRadius: '0.125rem',
      borderStyle: 'solid',
      borderWidth: '0.0625rem',
      marginBottom: '0.75rem'
    },
    label: {
      marginBottom: '0.375rem',
      fontSize: '0.75rem'
    },
    selectSiteList: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: '0.625rem',
      overflow: 'auto',
      maxHeight: '100vh'
    },
    selectSiteItem: {
      cursor: 'pointer',
      boxShadow: '0 0.5rem 1rem rgba(0,0,0,.15)',
      textAlign: 'center',
      border: '0.0625rem solid transparent'
    },
    selectSiteItemSelected: {
      cursor: 'pointer',
      boxShadow: '0 0.5rem 1rem rgba(0,0,0,.15)',
      textAlign: 'center',
      border: '0.0625rem solid black',
    },
    selectSiteItemName: {
      fontSize: '0.75rem',
      marginBottom: '0.75rem',
      marginTop: '0.75rem'
    },
    selectSiteItemImage: {
      width: '3.75rem',
      marginTop: '0.75rem'
    },
    accountLinkContainer: {
      border: "0.0625rem solid lightgray",
      borderRadius: '0.25rem',
    },
    accountLinkHeader: {
      padding: "0.25rem 0.75rem",
      borderBottom: "0.0625rem solid lightgray",
      display: "flex",
      alignItems: "center",
      height: '3rem',
    },
    accountLinkHeaderImage: {
      marginRight: '0.75rem',
      width: '2.5rem',
    },
    accountLinkHeaderTitle: {
      fontSize: '1rem',
      marginBottom: 0,
      marginTop: 0,
    },
    accountLinkBody: {
      margin: '0.75rem'
    },
    accountLinkFooter: {
      marginTop: '0.75rem',
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }
}
```

## Properties

| Name         | Type                         | Description                                                                   |
| ------------ | ---------------------------- | ----------------------------------------------------------------------------- |
| `elements`   | `{}` or `AppearanceElements` | _(Optional)_ An object that contains properties for customizing UI elements. |

The `elements` property within the `Appearance` type is an object that contains properties for customizing the appearance of various UI elements.

## `AppearanceElements`

| Name                   | Type               | Description                                                                                                          |
| ----------------------| ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `button`               | `Interpolation<any>` | _(Optional)_ An `Interpolation<any>` type property for customizing the appearance of buttons.                       |
| `input`                | `Interpolation<any>` | _(Optional)_ An `Interpolation<any>` type property for customizing the appearance of input fields.                   |
| `label`                | `Interpolation<any>` | _(Optional)_ An `Interpolation<any>` type property for customizing the appearance of labels.                         |
| `selectSiteList`       | `Interpolation<any>` | _(Optional)_ An `Interpolation<any>` type property for customizing the appearance of the site list in the account link view. |
| `selectSiteItem`       | `Interpolation<any>` | _(Optional)_ An `Interpolation<any>` type property for customizing the appearance of each site item in the site list. |
| `selectSiteItemSelected` | `Interpolation<any>` | _(Optional)_ An `Interpolation<any>` type property for customizing the appearance of a selected site item in the site list. |
| `selectSiteItemImage`  | `Interpolation<any>` | _(Optional)_ An `Interpolation<any>` type property for customizing the appearance of the site item image in the site list. |
| `selectSiteItemName`   | `Interpolation<any>` | _(Optional)_ An `Interpolation<any>` type property for customizing the appearance of the site item name in the site list. |
| `accountLinkContainer` | `Interpolation<any>` | _(Optional)_ An `Interpolation<any>` type property for customizing the appearance of the account link container.      |
| `accountLinkHeader`    | `Interpolation<any>` | _(Optional)_ An `Interpolation<any>` type property for customizing the appearance of the account link header.         |
| `accountLinkHeaderImage`| `Interpolation<any>` | _(Optional)_ An `Interpolation<any>` type property for customizing the appearance of the account link header image.   |
| `accountLinkHeaderTitle`| `Interpolation<any>` | _(Optional)_ An `Interpolation<any>` type property for customizing the appearance of the account link header title.   |
| `accountLinkBody`      | `Interpolation<any>` | _(Optional)_ An `Interpolation<any>` type property for customizing the appearance of the account link body.           |
| `accountLinkFooter`    | `Interpolation<any>` | _(Optional)_ An `Interpolation<any>` type property for customizing the appearance of the account link footer.         |


## Method
| name | params | 
|---|---|
| mountAccountLink | (id: string, options: [mountAccountLinkViewOptions](#mountAccountLinkViewOptions)) | 
| unmountAccountLink | (id: string) | 
| mountSelectSite | (id: string, options?: mountSelectSiteViewOptions) | 
| unmountSelectSite | (id: string) | 
| mountLinkingJourney | (id: string, options: [MountFullAccountLinkOptions](#MountFullAccountLinkOptions)) | 


## mountAccountLinkViewOptions <a href="#mountAccountLinkViewOptions" id="mountAccountLinkViewOptions"></a>
| Name | Params | Description |
| --- | --- | --- |
| site_id | `string` | (Optional) A string representing the merchant site ID. |
| quick_start | `boolean` | (Optional) A boolean representing whether to show a quick start option. |
| hide_title | `boolean` | (Optional) A boolean representing whether to hide the title. |


## mountSelectSiteViewOptions <a href="#mountSelectSiteViewOptions" id="mountSelectSiteViewOptions"></a>

| Name | Params | Description |
| --- | --- | --- |
| filter | `APIFilter` | (Optional) An object representing the filter criteria. |
| single | `boolean` | (Optional) A boolean representing whether to only allow one site selection. |
| submit | `Function` | (Optional) A function to be called when the selection is submitted. |
| hide_search | `boolean` | (Optional) A boolean representing whether to hide the search bar. |
| hide_button | `boolean` | (Optional) A boolean representing whether to hide the submit button. |

