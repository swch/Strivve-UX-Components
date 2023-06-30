import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import AccountLinkView, {
  AccountLinkView as MetaComponent,
} from './AccountLinkView';
import defaultAppearance from './appearance';
import { StrivveService } from './testHelper';
import StrivveCore from '../core/core';

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
        core={core}
        options={{
          site_id: '1',
        }}
      />
    );
  },
};
