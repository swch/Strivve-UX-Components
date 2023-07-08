import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import LinkingJourney, {
  LinkingJourney as MetaComponent,
} from '../component/LinkingJourney';
import Strivve from '../index';

const meta: Meta<typeof LinkingJourney> = {
  title: 'Example/Navigation',
  tags: ['autodocs'],
  component: LinkingJourney,
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: `
${'```html'}
<body>
<div>
  <button onclick="back()">Back</button>
</div>
<div style="margin: auto" id="full"></div>
</body>

<script>
// mount journey
const stv = Strivve.mountLinkingJourney({
  element_id: 'full',
  api_instance: 'customer-dev',
  card: {
    pan: '4111111111111111',
    cvv: '321',
    expiration_month: '02',
    expiration_year: '24',
    name_on_card: 'Mvick',
  },
});

const back = () => {
  const isLast = !Strivve.core?.goBack();
  if (isLast) {
    console.log('last route');
  }
}
</script>
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
        element_id: 'example-navigatiom',
        api_instance: 'customer-dev',
        card: {
          pan: '4111111111111111',
          cvv: '321',
          expiration_month: '02',
          expiration_year: '24',
          name_on_card: 'Mvick',
        },
      });
    };

    setTimeout(() => {
      mount();
    }, 1000);

    return (
      <div>
        <div
          style={{
            padding: '12px 0',
          }}
        >
          <button
            onClick={() => {
              const isLast = !Strivve.core?.goBack();
              if (isLast) {
                console.log('last route');
              }
            }}
          >
            Back
          </button>
        </div>
        <div id="example-navigatiom"></div>
      </div>
    );
  },
};
