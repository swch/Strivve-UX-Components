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

The `Appearance` type has the following properties:

- `layout`

  - `logoImageUrl` (optional): string
  - `appName` (optional): string
  - `unstyled` (optional): boolean

- `variables`

  - `colorPrimary` (optional): string
  - `colorSecondary` (optional): string
  - `fontFamily` (optional): string
  - `colorBorder` (optional): string
  - `colorText` (optional): string
  - `colorTextSecondary` (optional): string

- `elements`
  - `loader` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `button` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `secondaryButton` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `outlinedButton` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `textButton` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `iconButton` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `input` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `label` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `link` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `errorText` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `tabContainer` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `tabItem` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `tabItemActive` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `selectSiteView` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `selectSiteList` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `selectSiteItem` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `selectSiteHeader` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `selectSiteItemSelected` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `selectSiteItemImage` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `selectSiteItemName` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `selectSiteCarouselItem` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `selectSiteCarouselFooter` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `selectSiteCarouselItemSelected` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `selectSiteCarouselItemImage` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `selectSiteCarouselItemName` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `searchSiteView` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `searchSiteHeader` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `modal` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `modalStatus` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `modalTitle` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `modalDescription` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `accountLinkContainer` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `accountLinkHeader` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `accountLinkHeaderImage` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `accountLinkHeaderTitle` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `accountLinkHeaderDescription` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `accountLinkBody` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `accountLinkFooter` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `accountLinkView` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `accountLinkForm` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
  - `accountLinkProgress` (optional): [Object Styles](https://emotion.sh/docs/object-styles)
