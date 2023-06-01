import { Appearance } from "../types";

const defaultAppearance: Appearance = {
  logoUrl: 'https://strivve.com/wp-content/uploads/2019/09/StrivveLogoLG.png',
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
      background: '#008BD9',
      borderRadius: '6px',
      padding: '12px',
      border: 'none',
      color: 'white',
      width: '100%',
      cursor: 'pointer',
      '&:disabled': {
        background: 'lightgray'
      },
    },
    secondaryButton: {
      background: '#FFFFFF',
      border: '2px solid #008BD9',
      borderRadius: '6px',
      color: '#008BD9',
      cursor: 'pointer',
      padding: '8px 20px',
    },
    iconButton: {
      background: '#FFFFFF',
      border: '1px solid #D9D9D9',
      borderRadius: '6px',
      color: '#008BD9',
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
      fontFamily: 'sans-serif',
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
      background: 'rgba(255, 248, 234, 0.4)',
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
      fontFamily: 'sans-serif',
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
      fontFamily: 'sans-serif',
    },
    accountLinkProgressFooter: {
      height: '40px',
      borderBottom: '8px solid #6BBF00',
      borderLeft: '8px solid #6BBF00',
      borderRight: '8px solid #6BBF00',
      width: '100%',
      boxSizing: 'border-box'
    },
    accountLinkProgressTitle: {
      marginTop: '20px',
      marginBottom: '20px',
    }
  }
}

export default defaultAppearance;
