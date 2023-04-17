# Component
Contains functions to render components on the website.
```js
  const component = Strivve.createComponent({ core });
```

## Params
| name | params | description |
|---|---|---|
| core | [core instance](core.md) | required |
| style | `BaseStyle` | optional |

## Method
| name | params | 
|---|---|
| createAccountLink | (id: string, options: [MountAccountLinkOptions](#MountAccountLinkOptions)) | 
| createSelectSite | (id: string, options?: mountSelectSiteOptions) | 
| mountFullAccountLinking | (id: string, options: [MountFullAccountLinkOptions](#MountFullAccountLinkOptions)) | 


## MountAccountLinkOptions <a href="#MountAccountLinkOptions" id="MountAccountLinkOptions"></a>
| Name | Params | Description |
| --- | --- | --- |
| merchant_site_id | `string` | (Optional) A string representing the merchant site ID. |
| quick_start | `boolean` | (Optional) A boolean representing whether to show a quick start option. |
| hide_title | `boolean` | (Optional) A boolean representing whether to hide the title. |
| components | `MountAccountLinkComponents` | (Optional) An object containing custom components. |


## MountAccountLinkComponents

| Name | Params | Description |
| --- | --- | --- |
| input | `(data) => CustomComponent` | A function that takes in data and a change method, and returns a custom input component. |
| progress | `(data) => CustomComponent` | A function that takes in data and returns a custom progress component. |
| button | `(data) => CustomComponent` | A function that takes in data and returns a custom button component. |


## mountSelectSiteOptions <a href="#mountSelectSiteOptions" id="mountSelectSiteOptions"></a>

| Name | Params | Description |
| --- | --- | --- |
| filter | `APIFilter` | (Optional) An object representing the filter criteria. |
| single | `boolean` | (Optional) A boolean representing whether to only allow one site selection. |
| submit | `Function` | (Optional) A function to be called when the selection is submitted. |
| hide_search | `boolean` | (Optional) A boolean representing whether to hide the search bar. |
| hide_button | `boolean` | (Optional) A boolean representing whether to hide the submit button. |
| view | `'list'` &#124; `'grid'` | (Optional) A string representing the view mode. |
| components | `mountSelectSiteComponent` | (Optional) An object containing custom components. |

## mountSelectSiteComponent
| Name | Params | Description |
| --- | --- | --- |
| search | `(data) => CustomComponent` | A function that takes in data and returns a custom search component. |
| button | `(data) => CustomComponent` | A function that takes in data and returns a custom button component. |
| item | `(data) => CustomComponent` | A function that takes in data and returns a custom item component. |
| container | `(data) => CustomComponent` | A function that takes in data and returns a custom container component. |

## CustomComponent
| Property | Type | Description |
| --- | --- | --- |
| type | `string` | type is HTML element in string. e.g: input, p, div, ... |
| props? | `{ [key: string]: any }` | Optional. An object containing the props (properties) of the custom component. |
| children? | `Array<CustomComponent &#124; string &#124; null>` | Optional. An array containing child elements of the custom component. These can be either other custom components, strings, or null values. |
