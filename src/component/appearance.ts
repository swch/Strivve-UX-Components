import { Appearance } from "../types";

const defaultAppearance: Appearance = {
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

export default defaultAppearance;
