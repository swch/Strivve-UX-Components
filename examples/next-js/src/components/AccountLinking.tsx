import Strivve from '@strivve/component';
import axios from 'axios';
import { useEffect } from 'react';

export default function AccountLinking() {

  const init = async () => {
    // get grant and card id
    const res = await axios.get('/api/grant');
    const data = res.data;

    // initiate component
    const s = new Strivve();
    s.mountFullAccountLinking({
      element_id: 'linking',
      api_instance: 'customer-dev',
      card_id: data.card_id,
      grant: data.grant,
    });
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <div id="linking"></div>
    </div>
  )
}
