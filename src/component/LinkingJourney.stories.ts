import type { Meta, StoryObj } from '@storybook/react';

import LinkingJourney, { LinkingJourney as MetaComponent } from './LinkingJourney';
import defaultAppearance from './appearance';
import { coreTest } from './__tests__/helper';

const meta: Meta<typeof LinkingJourney> = {
  title: 'Journey/LinkingJourney',
  component: MetaComponent,
  tags: ['autodocs'],
  argTypes: {

  },
};

export default meta;
type Story = StoryObj<typeof MetaComponent>;

export const Component: Story = {
  args: {
    appearance: defaultAppearance,
    core: coreTest,
  },
};
