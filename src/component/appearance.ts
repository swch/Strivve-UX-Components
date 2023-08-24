import { Appearance } from '../types';
import { keyframes } from '@emotion/react';

const MOVE_BG = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(46px);
  }
`;

const defaultAppearance: Appearance = {
  layout: {
    logoImageUrl:
      'https://d1t7g1oas7m24a.cloudfront.net/tiles/dynamic-synthetic?width=128',
    appName: 'Strivve',
  },
  variables: {
    primaryColor: '#008BD9',
    secondaryColor: '#6BBF00',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    textColor: '#000000',
    textColorSecondary: '#565656',
    borderColor: 'lightgray',
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
      border: '1px solid var(--borderColor)',
      borderRadius: '5px',
      width: '-webkit-fill-available',
      ':focus-visible': {
        outlineColor: 'var(--primaryColor)',
      },
    },
    inputWrapper: {
      marginBottom: '12px',
    },
    link: {
      color: 'var(--secondaryColor)',
      cursor: 'pointer',
      '&:hover': {
        color: 'var(--secondaryColorDark)',
      },
    },
    tabContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      border: '1px solid var(--borderColor)',
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
      background: 'var(--secondaryColor)',
      border: 'none',
      cursor: 'pointer',
      color: 'white',
      fontWeight: 'bold',
    },
    button: {
      background: 'var(--primaryColor)',
      borderRadius: '6px',
      fontSize: 'var(--fontSize)',
      padding: '10px 12px',
      color: 'white',
      width: '100%',
      cursor: 'pointer',
      border: '2px solid var(--primaryColorDark)',
      '&:hover': {
        background: 'var(--primaryColorDark)',
      },
      '&:disabled': {
        background: 'gray',
        border: '2px solid gray',
      },
    },
    secondaryButton: {
      background: 'var(--secondaryColor)',
      fontSize: 'var(--fontSize)',
      borderRadius: '6px',
      padding: '10px 12px',
      color: 'white',
      width: '100%',
      cursor: 'pointer',
      border: '2px solid var(--secondaryColorDark)',
      '&:hover': {
        background: 'var(--secondaryColorDark)',
      },
      '&:disabled': {
        background: 'gray',
        border: '2px solid gray',
      },
    },
    outlinedButton: {
      background: '#FFFFFF',
      fontSize: 'var(--fontSize)',
      border: '2px solid var(--primaryColorDark)',
      borderRadius: '6px',
      color: 'var(--primaryColorDark)',
      cursor: 'pointer',
      padding: '10px 12px',
    },
    textButton: {
      borderRadius: '6px',
      fontSize: 'var(--fontSize)',
      color: 'var(--primaryColor)',
      cursor: 'pointer',
      padding: '10px 12px',
      '&:hover': {
        color: 'var(--primaryColorDark)',
      },
      border: 'none',
      outline: 'none',
      background: 'transparent',
    },
    iconButton: {
      background: '#FFFFFF',
      border: '1px solid #D9D9D9',
      borderRadius: '6px',
      color: 'var(--primaryColor)',
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
    modalWarning: {
      background: 'white',
      textAlign: 'center',
      margin: '20px auto',
      height: 'calc(100vh - 100px)',
      borderRadius: '5px',
      padding: '30px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
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
    mySiteTitle: {
      fontSize: '16px',
      marginBottom: '8px',
    },
    mySiteDescription: {
      marginTop: '0px',
      fontSize: '14px',
      color: 'var(--textColorSecondary)',
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
    selectSiteTitleLink: {
      textDecoration: 'underline',
      color: '#008BD9',
      cursor: 'pointer',
    },
    selectSiteList: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      overflow: 'auto',
      maxHeight: '400px',
      padding: '16px',
      borderTop: '1px solid var(--borderColor)',
    },
    selectSiteListFooter: {
      marginTop: '8px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
      position: 'relative',
      zIndex: 2,
      flex: 1,
      marginBottom: '6px',
    },
    selectSiteItemCard: {
      cursor: 'pointer',
      background: 'white',
      display: 'flex',
      alignItems: 'center',
      padding: '3px 12px',
      backgroundColor: 'white',
      position: 'relative',
      zIndex: 2,
      flex: 1,
    },
    selectSiteItemDisabled: {
      cursor: 'not-allowed',
      border: '1px solid #D9D9D9',
      background: 'white',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      padding: '3px 12px',
      backgroundColor: 'white',
      '&:hover': {
        opacity: '0.5',
      },
      marginBottom: '6px',
      position: 'relative',
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
      position: 'relative',
    },
    selectSiteItemName: {
      fontSize: '14px',
      marginBottom: '0.75rem',
      marginTop: '0.75rem',
      flex: 1,
    },
    selectSiteItemDescription: {
      fontSize: '12px',
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
      color: 'var(--textColor)',
      fontSize: '20px',
      fontWeight: 400,
    },
    accountLinkHeaderDescription: {
      margin: 0,
      color: 'var(--textColorSecondary)',
      fontSize: '16px',
      marginTop: '6px',
      marginBottom: '80px',
      fontWeight: 400,
    },
    accountLinkHeaderImage: {
      maxWidth: '70px',
    },
    accountLinkHeaderImageWrapper: {
      width: '100px',
      height: '100px',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: '50px',
      border: '1px solid var(--borderColor)',
      alignItems: 'center',
    },
    accountLinkBody: {
      marginTop: '70px',
    },
    accountLinkFooter: {
      marginTop: '40px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: '12px',
    },
    accountLinkProgress: {
      position: 'relative',
      padding: '8px',
      maxWidth: '280px',
      margin: 'auto',
      border: '1px solid var(--borderColor)',
      background: 'white',
    },
    accountLinkProgressCard: {
      background: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: '20px',
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
      background: 'var(--secondaryColor)',
      zIndex: 1,
      transitionDuration: '0.5s',
      overflow: 'hidden',
    },
    accountLinkProgressTitle: {
      margin: '20px',
      textAlign: 'center',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    accountLinkProgressDescription: {
      margin: '14px',
      textAlign: 'center',
      fontSize: '14px',
      minHeight: '20px',
    },
    accountLinkProgressFooter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '20px',
      gap: '20px',
    },
    accountLinkForgotLink: {
      textDecoration: 'none',
      color: '#008BD9',
    },
    accountLinkLoadingBackground: {
      position: 'absolute',
      left: '-46px',
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: -1,
      background: `repeating-linear-gradient(
        -55deg,
        #6bbf00 1px,
        #4b8600 2px,
        #4b8600 11px,
        #6bbf00 12px,
        #6bbf00 20px
      )`,
      animationName: MOVE_BG,
      animationDuration: '0.6s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
    },

    introView: {
      maxWidth: '400px',
      margin: '20px auto',
    },
    introTitle: {
      fontSize: '20px',
      color: 'var(--secondaryColor)',
    },
    introIconWrapper: {
      display: 'flex',
      fontSize: '16px',
      fontWeight: 'bold',
      alignItems: 'center',
      gap: '6px',
      '& svg': {
        width: '22px',
      },
      '& p': {
        marginBottom: 0,
        marginTop: 0,
        color: 'var(--textColorSecondary)',
      },
      borderBottom: '1px solid var(--borderColor)',
      paddingBottom: '30px',
    },
    introStepTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    introStepWrapper: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: '20px',
      textAlign: 'center',
      marginBottom: '20px',
    },
    introStepIconWrapper: {
      display: 'flex',
      fontSize: '16px',
      justifyContent: 'center',
      fontWeight: 'bold',
      alignItems: 'center',
      gap: '6px',
      color: 'var(--secondaryColor)',
      '& svg': {
        marginLeft: '-22px',
      },
    },
    introStepDescription: {
      marginTop: '6px',
      color: 'var(--textColorSecondary)',
    },
    introStepButtonWrapper: {
      width: '200px',
      margin: 'auto',
      marginTop: '20px',
    },
    introStepBanner: {
      width: '100%',
      cursor: 'pointer'
    },
  },
};

export default defaultAppearance;
