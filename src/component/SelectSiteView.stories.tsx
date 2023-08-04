import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import SelectSiteView, {
  SelectSiteView as MetaComponent,
} from './SelectSiteView';
import defaultAppearance from './appearance';
import { StrivveService } from './testHelper';
import StrivveCore from '../core/core';
import defaultLocalization from './localization';

const meta: Meta<typeof SelectSiteView> = {
  title: 'View/SelectSiteView',
  component: MetaComponent,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof SelectSiteView>;

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
 * component.mountSelectSiteView('select-sites', {
 *   submit: (selected) => {
 *     alert(selected.map((item) => item.name).join(', '));
 *   },
 * });
 * ```
 */
export const Component: Story = {
  render: () => {
    const service = new StrivveService({ api_instance: 'test' });
    const core = new StrivveCore({ service });
    return (
      <SelectSiteView
        appearance={defaultAppearance}
        localization={defaultLocalization}
        core={core}
        options={{}}
      />
    );
  },
};
