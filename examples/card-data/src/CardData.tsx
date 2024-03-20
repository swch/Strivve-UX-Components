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
      onSubmit: (selected : any) => {
        alert(selected.map((item : any) => item.name).join(', '));
      },
    });
  }, []);

  return (
    <div>
      <div id="card-data"></div>
    </div>
  )
}
