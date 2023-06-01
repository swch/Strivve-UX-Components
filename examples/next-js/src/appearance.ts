import { Appearance } from '@strivve/component';

const appearance: Appearance = {
  elements: {
    selectSiteView: {
      background: 'rgba(255, 248, 234, 0.4)',
    },
    selectSiteList: {
      display: 'block',
      maxHeight: '90vh',
      overflow: 'auto',
      padding: '10px 20px',
    },
    selectSiteItem: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '5px',
      border: '1px solid #D9D9D9',
      padding: '12px',
      background: 'white',
      marginBottom: '6px'
    },
    selectSiteItemSelected: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '5px',
      border: '1px solid black',
      padding: '12px',
      background: 'white',
      marginBottom: '6px'
    },
    selectSiteItemImage: {
      width: '22px',
      marginRight: '12px'
    },
    input: {
      padding: '12px',
      border: '1px solid #D9D9D9',
      borderRadius: '5px',
      marginBottom: '12px',
      width: '100%',
    },
    button: {
      background: '#008BD9',
      borderRadius: '6px',
      padding: '12px',
      border: 'none',
      color: 'white',
      width: '100%',
      cursor: 'pointer',
    },
    secondaryButton: {
      background: '#FFFFFF',
      border: '2px solid #008BD9',
      borderRadius: '6px',
      color: '#565656',
      cursor: 'pointer',
    },
    accountLinkForm: {
      padding: '20px',
    },
    accountLinkFooter: {
      marginTop: '20px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: '12px'
    },
  }
};

export default appearance;