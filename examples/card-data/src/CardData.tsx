import Strivve from '@strivve/strivve-cx';
import { useEffect } from 'react';

export default function CardData() {

  useEffect(() => {
    const service = Strivve.createService({ api_instance: 'customer-dev' });

    const core = Strivve.createCore({
      service,
      card: {
        pan: '4111111111111111',
        cvv: '321',
        expiration_month: '2',
        expiration_year: '24',
        name_on_card: 'Mvick',
      },
    });

    const component = Strivve.createComponent({ core });

    component.mountCardDataView('card-data', {
      onSubmit: (values : any) => {
        alert(JSON.stringify(values, null, 2));
      },
    });
  }, []);

  return (
    <div>
      <div id="card-data"></div>
    </div>
  )
}