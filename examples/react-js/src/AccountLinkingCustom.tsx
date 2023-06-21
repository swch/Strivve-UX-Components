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
        layout: {
          appName: 'Custom',
        },
        variables: {
          colorPrimary: 'red',
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
