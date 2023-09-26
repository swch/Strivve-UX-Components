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
    fontSize: '16px',
    textColor: '#000000',
    textColorSecondary: '#565656',
    borderColor: 'lightgray',
    height: '100vh',
    backgroundColor: 'rgba(255, 248, 234, 0.4)',
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
      fontSize: '16px',
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
      '@media (max-width: 400px)': {
        margin: '20px',
      },
    },
    modalWarning: {
      background: 'white',
      textAlign: 'center',
      margin: '20px auto',
      height: 'calc(100vh - 140px)',
      borderRadius: '5px',
      padding: '30px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      maxWidth: '300px',
      '@media (max-width: 440px)': {
        margin: '20px',
      },
    },
    modalTitle: {
      fontSize: '20px',
      fontWeight: 'normal',
    },
    modalDescription: {
      marginTop: '12px',
      marginBottom: '20px',
      fontSize: '16px',
      color: 'var(--textColorSecondary)',
    },
    searchSiteView: {
      background: '#FFFFFF',
      borderRadius: '5px',
      overflow: 'hidden',
      maxWidth: '400px',
      margin: '20px auto',
      '@media (max-width: 440px)': {
        margin: '20px',
      },
    },
    searchSiteHeader: {
      padding: '16px 16px 0 16px',
      position: 'relative',
      borderBottom: '1px solid #A4A4A4',
    },
    searchSiteTitle: {
      fontSize: '20px',
      marginBottom: '16px',
      marginTop: '12px',
    },
    searchSiteClose: {
      position: 'absolute',
      top: 10,
      right: 10,
      cursor: 'pointer',
      color: 'rgba(0, 139, 217, 1)',
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
      margin: '0 auto',
      overflowX: 'hidden',
      minHeight: 'var(--height)',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--backgroundColor)',
      color: 'var(--textColor)',
    },
    selectSiteHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '16px',
      gap: '16px',
      margin: '12px 16px',
      marginTop: '20px',
    },
    selectSiteTitle: {
      marginBottom: '0px',
      marginTop: '0px',
      fontSize: '20px',
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
      maxHeight: 'calc(var(--height) - 200px)',
      padding: '4px 16px',
      borderTop: '1px solid var(--borderColor)',
      '&::-webkit-scrollbar': {
        width: '6px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(217, 217, 217, 1)',
        borderRadius: '2px',
      },
      '&:hover::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(217, 217, 217, 1)',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: '#f1f1f1',
      },
    },
    selectSiteListFooter: {
      marginTop: '8px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flex: 1,
      marginBottom: '10px',
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
    selectSiteItemHeader: {
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
      margin: '4px',
      overflow: 'hidden',
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
      fontSize: '16px',
      marginBottom: '0.75rem',
      marginTop: '0.75rem',
      flex: 1,
    },
    selectSiteItemDescription: {
      fontSize: '14px',
    },
    selectSiteItemImage: {
      width: '29px',
      marginRight: '12px',
    },
    selectSiteCarouselFooter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flex: 1,
      marginBottom: '10px',
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
      marginTop: '20px',
      flex: 1,
      padding: '16px',
    },
    accountLinkView: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'var(--height)',
      backgroundColor: 'var(--backgroundColor)',
      color: 'var(--textColor)',
    },
    accountLinkHeader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '36px',
      gap: '4px',
      marginTop: '68px',
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
      marginBottom: '12px',
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
      marginTop: '90px',
    },
    accountLinkFooter: {
      marginTop: '40px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: '17px',
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
      fontSize: '20px',
    },
    accountLinkProgressDescription: {
      margin: '16px',
      textAlign: 'center',
      fontSize: '16px',
      minHeight: '20px',
      color: 'var(--textColorSecondary)',
    },
    accountLinkProgressFooter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '20px',
      marginBottom: '10px',
      gap: '20px',
      flex: 1,
      justifyContent: 'end',
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
      animationDuration: '2s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
    },

    introView: {
      maxWidth: '400px',
      margin: 'auto',
      minHeight: 'var(--height)',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--backgroundColor)',
      color: 'var(--textColor)',
    },
    introTitle: {
      fontSize: '20px',
      color: 'var(--secondaryColor)',
      margin: '12px 16px',
      paddingTop: '6px',
    },
    introIconWrapper: {
      display: 'flex',
      fontSize: '16px',
      fontWeight: 'bold',
      alignItems: 'center',
      margin: '12px 16px',
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
      margin: '12px 16px',
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
      color: 'var(--textColorSecondary)',
      maxWidth: '100px',
      margin: 'auto',
      marginTop: '6px',
    },
    introStepButtonWrapper: {
      width: '200px',
      margin: '0 auto',
      marginTop: '30px',
      marginBottom: '10px',
      fontSize: '16px',
    },
    introStepBanner: {
      width: 'calc(100% - 32px)',
      cursor: 'pointer',
      margin: '0px 16px',
    },

    headerWrapper: {
      width: 'calc(100% - 16px)',
      maxWidth: '400px',
      margin: 'auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& svg': {
        cursor: 'pointer',
      },
      borderBottom: '1px solid var(--borderColor)',
      padding: '0 8px',
      gap: '12px',
      minHeight: '50px',
    },
    headerTitle: {
      fontSize: '22px',
      marginTop: '0px',
      marginBottom: '0px',
    },
  },
};

export default defaultAppearance;
