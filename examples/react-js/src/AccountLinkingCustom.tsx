import Strivve from '@strivve/component';
import { useEffect } from 'react';

export default function AccountLinkingCustom() {

  useEffect(() => {
    const s = new Strivve();
    s.mountLinkingJourney({
      element_id: 'linking-custom',
      api_instance: 'customer-dev',
      card: {
        pan: '4111111111111111',
        cvv: '321',
        expiration_month: '02',
        expiration_year: '24',
        name_on_card: 'Mvick',
      },
      appearance: {
        elements: {
          button: {
            backgroundColor: 'red',
            padding: '0.5rem 1rem',
            color: 'white',
          },
          input: {
            width: '100%',
            padding: '0.5rem 1rem',
            marginBottom: '0.2rem',
          },
          selectSiteList: {
            maxHeight: '80vh',
            overflow: 'auto',
            marginTop: '0.5rem',
          },
          selectSiteItem: {
            display: 'flex',
            alignItems: 'center',
            border: '1px solid lightgray',
            marginBottom: '0.2rem',
            padding: '0.4rem',
            cursor: 'pointer',
          },
          selectSiteItemSelected: {
            display: 'flex',
            alignItems: 'center',
            border: '1px solid red',
            marginBottom: '0.2rem',
            padding: '0.4rem',
            cursor: 'pointer',
          },
          selectSiteItemImage: {
            width: '2rem',
            marginRight: '1rem'
          },
          accountLinkHeader: {
            display: 'flex',
            alignItems: 'center',
          },
          accountLinkHeaderImage: {
            width: '2rem',
            marginRight: '1rem'
          },
          accountLinkHeaderTitle: {
            fontSize: '1.2rem'
          }
        }
      }
    })
  }, []);

  return (
    <div>
      <div id="linking-custom"></div>
    </div>
  )
}
