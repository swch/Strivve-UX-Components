import Strivve from '@strivve/strivve-cx';
import { useEffect } from 'react';

export default function AccountLinkingCustom() {

  useEffect(() => {
    Strivve.mountLinkingJourney({
      element_id: 'linking-custom',
      api_instance: 'customer-dev',
      card: {
        pan: '4111111111111111',
        cvv: '321',
        expiration_month: '2',
        expiration_year: '24',
        name_on_card: 'Mvick',
      },
      appearance: {
        layout: {
          appName: 'Custom',
        },
        variables: {
          primaryColor: 'red',
        }
      }
    })
  }, []);

  return (
    <div>
      <div id="linking-custom"></div>
    </div>
  );
}
