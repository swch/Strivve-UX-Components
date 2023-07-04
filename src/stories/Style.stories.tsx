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

const appearance: Appearance = {
  variables: {
    colorPrimary: 'black',
    colorSecondary: 'black',
    colorBorder: 'black',
  },
  elements: {
    selectSiteList: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: '12px',
      borderTop: 'none',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      borderRadius: '12px',
    },
    selectSiteTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
    },
    selectSiteItem: {
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      border: 'none',
      borderRadius: '8px',
      transitionDuration: '0.2s',
      '&:hover': {
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 2px',
      },
    },
    selectSiteItemImage: {
      height: '80px',
      width: 'auto',
    },
    input: {
      borderRadius: '20px',
    },
    button: {
      borderRadius: '20px',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      '&:hover': {
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 2px',
      },
    },
    outlinedButton: {
      borderRadius: '20px',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      '&:hover': {
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 2px',
      },
    },
    accountLinkContainer: {
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      borderRadius: '12px',
      padding: '30px',
      maxWidth: '330px',
    },
    accountLinkView: {
      margin: '20px',
    },
    accountLinkHeaderTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
    },
  },
};

const meta: Meta<typeof LinkingJourney> = {
  title: 'Costumize/Style',
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
  appearance: ${JSON.stringify(appearance, null, 2)},
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
        appearance,
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
