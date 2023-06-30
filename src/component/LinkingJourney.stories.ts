import type { Meta, StoryObj } from '@storybook/react';

import LinkingJourney, {
  LinkingJourney as MetaComponent,
} from './LinkingJourney';
import defaultAppearance from './appearance';
import { coreTest } from './testHelper';

const meta: Meta<typeof LinkingJourney> = {
  title: 'Journey/LinkingJourney',
  component: MetaComponent,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof MetaComponent>;

/**
 * ```js
 * component.mountLinkingJourney('account-link', {
 *   selectSiteOptions: {},
 *   accountLinkOptions: {},
 * });
 * ```
 */
export const Component: Story = {
  args: {
    appearance: defaultAppearance,
    core: coreTest,
  },
};
