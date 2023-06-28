import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import SelectSiteView, { SelectSiteView as MetaComponent } from './SelectSiteView';
import defaultAppearance from './appearance';
import { StrivveService } from './__tests__/helper';
import StrivveCore from '../core/core';

const meta: Meta<typeof SelectSiteView> = {
  title: 'View/SelectSiteView',
  component: MetaComponent,
  tags: ['autodocs'],
  argTypes: {

  },
};

export default meta;

type Story = StoryObj<typeof SelectSiteView>;

/**
* ```js
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
        core={core}
        options={{}}
      />
    )
  },
};

