import Strivve from '@strivve/strivve-cx';
import { useEffect } from 'react';

export default function AccountLinking() {

  useEffect(() => {
    Strivve.mountLinkingJourney({
      element_id: 'linking',
      api_instance: 'customer-dev',
      card: {
        pan: '4111111111111111',
        cvv: '321',
        expiration_month: '2',
        expiration_year: '24',
        name_on_card: 'Mvick',
        address: {
          city: 'Seattle',
          postal_code: '98177',
          country: 'USA',
          first_name: 'Jane',
          last_name: 'Smith',
          email: 'jane@test.com',
          phone_number: '2065555555',
          address1: 'test',
          state: 'test',
          subnational: 'WA',
          is_primary: true,
        },
      },
    })
  }, []);

  return (
    <div>
      <div id="linking"></div>
    </div>
  )
}
