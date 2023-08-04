import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import AccountLinkView, {
  AccountLinkView as MetaComponent,
} from './AccountLinkView';
import defaultAppearance from './appearance';
import { StrivveService } from './testHelper';
import StrivveCore from '../core/core';
import defaultLocalization from './localization';

const meta: Meta<typeof AccountLinkView> = {
  title: 'View/AccountLinkView',
  component: MetaComponent,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AccountLinkView>;

/**
 * ```js
 * const service = Strivve.createService({ api_instance: 'customer-dev' });
 *
 * const core = Strivve.createCore({
 *  service,
 *  card: {
 *    pan: '4111111111111111',
 *    cvv: '321',
 *    expiration_month: '2',
 *    expiration_year: '24',
 *    name_on_card: 'Mvick',
 *  },
 * });
 *
 * const component = Strivve.createComponent({ core });
 *
 * component.mountAccountLinkView('account-link', {
 *   site_id: '1',
 * });
 * ```
 */
export const Component: Story = {
  render: () => {
    const service = new StrivveService({ api_instance: 'test' });
    const core = new StrivveCore({ service });
    return (
      <AccountLinkView
        appearance={defaultAppearance}
        localization={defaultLocalization}
        core={core}
        options={{
          site_id: '1',
        }}
      />
    );
  },
};
