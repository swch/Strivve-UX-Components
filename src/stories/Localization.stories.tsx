import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import LinkingJourney, {
  LinkingJourney as MetaComponent,
} from '../component/LinkingJourney';
import Strivve from '../index';
import { Localization } from '../types';

const localization: Localization = {
  selectSiteTitle: 'Select my site',
  selectSiteTitleHaveJob: 'Select Site',
  accountLinkTitle: 'Sign in',
  accountLinkDescription: 'to continue account linking',
};

const meta: Meta<typeof LinkingJourney> = {
  title: 'Customization/Localization',
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
      });
    };

    setTimeout(() => {
      mount();
    }, 1000);

    return <div id="account-link"></div>;
  },
};
