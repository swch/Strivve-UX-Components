import { Appearance } from '../types';

const defaultAppearance: Appearance = {
  layout: {
    logoImageUrl:
      'https://strivve.com/wp-content/uploads/2019/09/StrivveLogoLG.png',
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
      border: '1px solid var(--colorBorder)',
      borderRadius: '5px',
      marginBottom: '12px',
      width: '-webkit-fill-available',
      ':focus-visible': {
        outlineColor: 'var(--colorPrimary)',
      },
    },
    link: {
      color: 'var(--colorSecondary)',
      cursor: 'pointer',
      '&:hover': {
        color: 'var(--colorSecondaryDark)',
      },
    },
    tabContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      border: '1px solid var(--colorBorder)',
      borderRadius: '4px',
      overflow: 'hidden',
      margin: '16px',
    },
    tabItem: {
      padding: '6px',
      textAlign: 'center',
      outline: 'none',
      background: 'white',
      border: 'none',
      cursor: 'pointer',
    },
    tabItemActive: {
      padding: '6px',
      textAlign: 'center',
      outline: 'none',
      background: 'var(--colorSecondary)',
      border: 'none',
      cursor: 'pointer',
      color: 'white',
      fontWeight: 'bold',
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
        background: 'var(--colorPrimaryDark)',
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
        background: 'var(--colorSecondaryDark)',
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
      color: 'var(--colorPrimaryDark)',
      cursor: 'pointer',
      padding: '10px 12px',
    },
    textButton: {
      borderRadius: '6px',
      color: 'var(--colorPrimary)',
      cursor: 'pointer',
      padding: '10px 12px',
      '&:hover': {
        color: 'var(--colorPrimaryDark)',
      },
      border: 'none',
      outline: 'none',
      background: 'transparent',
    },
    iconButton: {
      background: '#FFFFFF',
      border: '1px solid #D9D9D9',
      borderRadius: '6px',
      color: 'var(--colorPrimary)',
      cursor: 'pointer',
      padding: '4px 6px 1px 6px',
    },
    label: {
      marginBottom: '6px',
      fontSize: '16px',
    },
    errorText: {
      color: 'red',
      fontSize: '12px',
      '& a': {
        textDecoration: 'underline',
      },
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
      margin: '20px auto',
      borderRadius: '5px',
      padding: '30px',
      position: 'relative',
      maxWidth: '300px',
      '@media (max-width: 600px)': {
        margin: '20px',
      },
    },
    modalDescription: {
      marginTop: '12px',
      marginBottom: '20px',
    },
    searchSiteView: {
      background: '#FFFFFF',
      borderRadius: '5px',
      overflow: 'hidden',
      maxWidth: '400px',
      margin: '20px auto',
    },
    searchSiteHeader: {
      padding: '16px 16px 0 16px',
      position: 'relative',
      borderBottom: '1px solid #A4A4A4',
    },
    selectSiteView: {
      maxWidth: '400px',
      margin: 'auto',
    },
    selectSiteHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '16px',
      gap: '16px',
    },
    selectSiteTitle: {
      marginBottom: '0px',
      marginTop: '0px',
    },
    selectSiteList: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridGap: '6px',
      overflow: 'auto',
      maxHeight: '400px',
      padding: '16px',
      borderTop: '1px solid var(--colorBorder)',
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
      fontSize: '14px',
      marginBottom: '0.75rem',
      marginTop: '0.75rem',
      flex: 1,
    },
    selectSiteItemImage: {
      width: '25px',
      marginRight: '12px',
    },
    selectSiteCarouselFooter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
      minHeight: '80px',
      margin: 'auto',
      marginTop: '12px',
    },
    selectSiteCarouselItemName: {
      margin: '8px 20px 20px 20px',
      height: '24px',
    },
    accountLinkContainer: {
      maxWidth: '400px',
      margin: 'auto',
    },
    accountLinkView: {},
    accountLinkHeader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '36px',
      gap: '4px',
      marginTop: '40px',
    },
    accountLinkHeaderTitle: {
      margin: 0,
      color: 'var(--colorText)',
      fontSize: '20px',
      fontWeight: 400,
    },
    accountLinkHeaderDescription: {
      margin: 0,
      color: 'var(--colorTextSecondary)',
      fontSize: '16px',
      marginTop: '6px',
      marginBottom: '80px',
      fontWeight: 400,
    },
    accountLinkHeaderImage: {
      height: '36px',
      maxWidth: '100px',
    },
    accountLinkBody: {
      marginTop: '70px',
    },
    accountLinkFooter: {
      marginTop: '20px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: '12px',
    },
    accountLinkProgress: {
      position: 'relative',
      padding: '8px',
      maxWidth: '280px',
      margin: 'auto',
    },
    accountLinkProgressCard: {
      background: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: '40px',
      paddingTop: '20px',
      position: 'relative',
      zIndex: 2,
    },
    accountLinkProgressBar: {
      height: '{percent}%',
      position: 'absolute',
      bottom: 0,
      width: '100%',
      left: 0,
      background: 'var(--colorSecondary)',
      zIndex: 1,
      transitionDuration: '0.5s',
    },
    accountLinkProgressTitle: {
      margin: '20px',
      textAlign: 'center',
      fontSize: '14px',
    },
    accountLinkProgressFooter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '20px',
      gap: '20px',
    },
  },
};

export default defaultAppearance;
