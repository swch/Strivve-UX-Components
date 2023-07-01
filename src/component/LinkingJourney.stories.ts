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
 * Strivve.mountLinkingJourney({
 *  element_id: 'account-link',
 *  api_instance: 'customer-dev',
 *  card: {
 *    pan: '4111111111111111',
 *    cvv: '321',
 *    expiration_month: '02',
 *    expiration_year: '24',
 *    name_on_card: 'Mvick',
 *  },
 * });
 * ```
 * or
 *
 * ```js
 * const service = Strivve.createService({ api_instance: 'customer-dev' });
 *
 * const core = Strivve.createCore({
 *  service,
 *  card: {
 *    pan: '4111111111111111',
 *    cvv: '321',
 *    expiration_month: '02',
 *    expiration_year: '24',
 *    name_on_card: 'Mvick',
 *  },
 * });
 *
 * const component = Strivve.createComponent({ core });
 *
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
