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
| createAccountLink | (id: string, options: [mountAccountLinkViewOptions](#mountAccountLinkViewOptions)) | 
| createSelectSite | (id: string, options?: mountSelectSiteViewOptions) | 
| mountLinkingJourney | (id: string, options: [MountFullAccountLinkOptions](#MountFullAccountLinkOptions)) | 


## mountAccountLinkViewOptions <a href="#mountAccountLinkViewOptions" id="mountAccountLinkViewOptions"></a>
| Name | Params | Description |
| --- | --- | --- |
| site_id | `string` | (Optional) A string representing the merchant site ID. |
| quick_start | `boolean` | (Optional) A boolean representing whether to show a quick start option. |
| hide_title | `boolean` | (Optional) A boolean representing whether to hide the title. |
| components | `mountAccountLinkViewComponents` | (Optional) An object containing custom components. |


## mountAccountLinkViewComponents

| Name | Params | Description |
| --- | --- | --- |
| input | `(data) => CustomComponent` | A function that takes in data and a change method, and returns a custom input component. |
| progress | `(data) => CustomComponent` | A function that takes in data and returns a custom progress component. |
| button | `(data) => CustomComponent` | A function that takes in data and returns a custom button component. |


## mountSelectSiteViewOptions <a href="#mountSelectSiteViewOptions" id="mountSelectSiteViewOptions"></a>

| Name | Params | Description |
| --- | --- | --- |
| filter | `APIFilter` | (Optional) An object representing the filter criteria. |
| single | `boolean` | (Optional) A boolean representing whether to only allow one site selection. |
| submit | `Function` | (Optional) A function to be called when the selection is submitted. |
| hide_search | `boolean` | (Optional) A boolean representing whether to hide the search bar. |
| hide_button | `boolean` | (Optional) A boolean representing whether to hide the submit button. |
| view | `'list'` &#124; `'grid'` | (Optional) A string representing the view mode. |
| components | `mountSelectSiteViewComponent` | (Optional) An object containing custom components. |

## mountSelectSiteViewComponent
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
