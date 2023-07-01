import React, { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import LinkingJourney, {
  LinkingJourney as MetaComponent,
} from '../component/LinkingJourney';
import Strivve from '../Strivve';
import { StrivveService, coreTest } from '../component/testHelper';

const meta: Meta<typeof LinkingJourney> = {
  title: 'Costumize/LinkingJourney',
};

export default meta;
type Story = StoryObj<typeof MetaComponent>;

/**
 * ```js
 * Strivve.mountLinkingJourney({
 *  element_id: 'account-link',
 *  api_instance: 'customer-dev',
 *  card: {
 *    pan: '4111111111111111',
 *    cvv: '321',
 *    expiration_month: '02',
 *    expiration_year: '24',
 *    name_on_card: 'Mvick',
 *  },
 * });
 * ```
 * or
 *
 * ```js
 * const service = Strivve.createService({ api_instance: 'customer-dev' });
 *
 * const core = Strivve.createCore({
 *  service,
 *  card: {
 *    pan: '4111111111111111',
 *    cvv: '321',
 *    expiration_month: '02',
 *    expiration_year: '24',
 *    name_on_card: 'Mvick',
 *  },
 * });
 *
 * const component = Strivve.createComponent({ core });
 *
 * component.mountLinkingJourney('account-link', {
 *   selectSiteOptions: {},
 *   accountLinkOptions: {},
 * });
 * ```
 */
export const Component: Story = {
  args: {},
  render: () => {
    const strivve = new Strivve();

    setTimeout(() => {
      strivve.mountLinkingJourney({
        Service: StrivveService,
        element_id: 'account-link',
        api_instance: 'customer-dev',
        card: {
          pan: '4111111111111111',
          cvv: '321',
          expiration_month: '02',
          expiration_year: '24',
          name_on_card: 'Mvick',
        },
        appearance: {
          variables: {
            colorPrimary: 'black',
          },
        },
      });
    }, 1000);
    return <div id="account-link"></div>;
  },
};
