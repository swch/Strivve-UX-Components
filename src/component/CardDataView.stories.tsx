import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import CardDataView, {
  CardDataView as MetaComponent,
} from './CardDataView';
import defaultAppearance from './appearance';
import { StrivveService } from './testHelper';
import StrivveCore from '../core/core';
import defaultLocalization from './localization';

const meta: Meta<typeof CardDataView> = {
  // title: 'View/CardDataView',
  component: MetaComponent,
  // tags: ['autodocs'],
  argTypes: {},
};

// export default meta;
export default {
  title : 'View/CardDataView',
  tags : ['autodocs'],
  ...meta
}

type Story = StoryObj<typeof CardDataView>;

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
      <CardDataView
        appearance={defaultAppearance}
        localization={defaultLocalization}
        core={core}
      />
    );
  },
};
