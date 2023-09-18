
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
const { CardsavrHelper } = require("@strivve/strivve-sdk/lib/cardsavr/CardsavrHelper");
import { Encryption } from '@strivve/strivve-sdk/lib/cardsavr/CardsavrSessionCrypto';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // get config
    const api_instance = 'customer-dev';
    const cardsavr_server = `https://csapi.${api_instance}.cardupdatr.app`;
    const configResponse = await axios.get(`https://${api_instance}.cardupdatr.app/config.json`);
    const config = Array.isArray(configResponse.data) ? await Encryption.decryptResponse(configResponse.data[0], { "encrypted_body": configResponse.data[1] }) : configResponse.data;

    // set config
    const ch = CardsavrHelper.getInstance();
    ch.setAppSettings(cardsavr_server, config.name, config.key, false, undefined, undefined, false)

    await ch.loginAndCreateSession(config.username, config.password);

    const card_data = {
      pan: '4111111111111111',
      cvv: '321',
      expiration_month: '12',
      expiration_year: '24',
      name_on_card: 'Test',
      cardholder : {
        email: 'receives_email_updates@jobcompletion.com'
      },
      address: {
        is_primary : "true",
        address1 : "1234 1st ave",
        address2 : "APT 202",
        city : "Seattle",
        subnational : "WA",
        postal_code : "98104",
        country : "USA",
        phone_number : "5555555555",
        first_name : "Test",
        last_name : "User"
      }
    }
    
    const card_response = await ch.createCard({ agent_username: config.username, card: card_data });

    res.status(200).json({ grant : card_response?.cardholder?.grant, card_id : card_response?.id });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};