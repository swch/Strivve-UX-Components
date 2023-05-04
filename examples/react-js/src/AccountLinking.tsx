import Strivve from '@strivve/component';
import { useEffect } from 'react';

export default function AccountLinking() {

  useEffect(() => {
    const s = new Strivve();
    s.mountLinkingJourney({
      element_id: 'linking',
      api_instance: 'customer-dev',
      card: {
        pan: '4111111111111111',
        cvv: '321',
        expiration_month: '02',
        expiration_year: '24',
        name_on_card: 'Mvick',
      },
    })
  }, []);

  return (
    <div>
      <div id="linking"></div>
    </div>
  )
}
