import Strivve from '@strivve/strivve-cx';
import { useEffect } from 'react';

export default function AccountLinking() {

  useEffect(() => {
    Strivve.mountLinkingJourney({
      element_id: 'linking',
      api_instance: 'pkumar',
      card: {
        pan: '5556710082949240',
        cvv: '716',
        expiration_month: '01',
        expiration_year: '28',
        name_on_card: 'Annemarie Marcus',
        address: {
          city: 'Kirkland',
          postal_code: '98034',
          country: 'USA',
          first_name: 'Annemarie',
          last_name: 'Marcus',
          // email: 'jane@test.com',
          phone_number: '2065555555',
          address1: '10250 NE 121st ST',
          state: 'WA',
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
