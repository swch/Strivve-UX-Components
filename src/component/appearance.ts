import { Appearance } from "../types";

const defaultAppearance: Appearance = {
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
    loader: {
      width: '48px',
      height: '48px',
      border: '5px solid lightgray',
      borderBottomColor: 'transparent',
      borderRadius: '50%',
      display: 'inline-block',
      boxSizing: 'border-box',
      animation: 'rotation 1s linear infinite',
    },
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
    },
    secondaryButton: {
      background: 'var(--colorSecondary)',
      borderRadius: '6px',
      padding: '10px 12px',
      color: 'white',
      width: '100%',
      cursor: 'pointer',
      border: '2px solid var(--colorSecondaryDark)',
      '&:hover': {
        background: 'var(--colorSecondaryDark)'
      },
      '&:disabled': {
        background: 'gray',
        border: '2px solid gray',
      },
    },
    outlinedButton: {
      background: '#FFFFFF',
      border: '2px solid var(--colorPrimaryDark)',
      borderRadius: '6px',
      color: 'var(--colorTextSecondary)',
      cursor: 'pointer',
      padding: '10px 12px',
    },
    iconButton: {
      background: '#FFFFFF',
      border: '1px solid #D9D9D9',
      borderRadius: '6px',
      color: 'var(--colorPrimary)',
      cursor: 'pointer',
      padding: '4px 6px',
    },
    label: {
      marginBottom: '6px',
      fontSize: '16px'
    },
    modal: {
      position: 'fixed',
      zIndex: 100,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.8)',
      top: 0,
      left: 0,
    },
    modalStatus: {
      background: 'white',
      textAlign: 'center',
      margin: '20px',
      borderRadius: '5px',
      padding: '30px',
      position: 'relative',
    },
    searchSiteView: {
      margin: '20px',
      background: '#FFFFFF',
      borderRadius: '5px',
      overflow: 'hidden',
    },
    searchSiteHeader: {
      padding: '16px 16px 0 16px',
      position: 'relative',
      borderBottom: '1px solid #A4A4A4'
    },
    selectSiteView: {
      maxWidth: '400px',
      margin: 'auto',
    },
    selectSiteHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '16px',
      gap: '16px'
    },
    selectSiteList: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridGap: '6px',
      overflow: 'auto',
      maxHeight: '400px',
      padding: '16px'
    },
    selectSiteItem: {
      cursor: 'pointer',
      border: '1px solid #D9D9D9',
      background: 'white',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      padding: '3px 12px',
      backgroundColor: 'white',
    },
    selectSiteItemSelected: {
      cursor: 'pointer',
      border: '1px solid black',
      background: 'white',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      padding: '3px 12px',
      backgroundColor: 'white',
    },
    selectSiteItemName: {
      fontSize: '0.75rem',
      marginBottom: '0.75rem',
      marginTop: '0.75rem'
    },
    selectSiteItemImage: {
      width: '25px',
       marginRight: '12px',
    },
    selectSiteCarouselFooter: {
      display: 'flex',
      justifyContent: 'center'
    },
    selectSiteCarouselItem: {
      cursor: 'pointer',
      textAlign: 'center',
      border: '1px solid #D9D9D9',
      background: 'white',
      borderRadius: '4px',
    },
    selectSiteCarouselItemSelected: {
      cursor: 'pointer',
      textAlign: 'center',
      border: '1px solid black',
      background: 'white',
      borderRadius: '4px',
    },
    selectSiteCarouselItemImage: {
      width: '50%',
      margin: 'auto',
      marginTop: '12px',
    },
    selectSiteCarouselItemName: {
      margin: '8px 20px 20px 20px',
    },
    accountLinkView: {
      maxWidth: '400px',
      margin: 'auto',
    },
    accountLinkContainer: {
    },
    accountLinkHeader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '36px',
      gap: '4px',
      marginTop: '40px',
    },
    accountLinkHeaderImage: {
      height: '36px',
      maxWidth: '100px'
    },
    accountLinkBody: {
      marginTop: '60px',
    },
    accountLinkFooter: {
      marginTop: '20px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: '12px'
    },
    accountLinkProgress: {
      background: 'white',
      margin: 'auto',
      maxWidth: '280px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    accountLinkProgressFooter: {
      height: '8px',
      backgroundColor: 'lightgray',
      width: '100%',
      boxSizing: 'border-box',
      marginTop: '40px'
    },
    accountLinkProgressTitle: {
      marginTop: '20px',
      marginBottom: '20px',
    }
  }
}

export default defaultAppearance;
