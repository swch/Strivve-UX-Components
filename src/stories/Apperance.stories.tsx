import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import LinkingJourney, {
  LinkingJourney as MetaComponent,
} from '../component/LinkingJourney';
import Strivve from '../index';
import { StrivveService } from '../component/testHelper';
import { Appearance, Localization } from '../types';

const localization: Localization = {
  selectSiteTitle: 'Select Site',
  selectSiteTitleHaveJob: 'Select Site',
  accountLinkTitle: 'Sign in',
  accountLinkDescription: 'to continue account linking',
};

const meta: Meta<typeof LinkingJourney> = {
  title: 'Costumize/Appearance',
  tags: ['autodocs'],
  component: LinkingJourney,
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: `
${'```js'}
Strivve.mountLinkingJourney({
  element_id: 'account-link',
  api_instance: 'customer-dev',
  card: {
    pan: '4111111111111111',
    cvv: '321',
    expiration_month: '02',
    expiration_year: '24',
    name_on_card: 'Mvick',
  },
  localization: ${JSON.stringify(localization, null, 2)},
});

${'```'}

`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MetaComponent>;

export const Component: Story = {
  args: {},
  render: () => {
    const mount = () => {
      Strivve.mountLinkingJourney({
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
        localization,
        select_site: {
          view: 'list',
        },
      });
    };

    setTimeout(() => {
      mount();
    }, 2000);

    return <div id="account-link"></div>;
  },
};
