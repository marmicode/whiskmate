import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { userEvent, within } from '@storybook/testing-library';
import {
  RecipeSearchComponent,
  RecipeSearchModule,
} from './recipe-search.component';

export default {
  title: 'RecipeSearchComponent',
  component: RecipeSearchComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule, RecipeSearchModule],
    }),
  ],
} as Meta<RecipeSearchComponent>;

const Template: Story<RecipeSearchComponent> = (
  args: RecipeSearchComponent
) => ({
  props: args,
});

import { expect } from '@storybook/jest';

export const Primary = Template.bind({});
Primary.play = async ({ canvasElement }) => {
  // Starts querying the component from its root element
  const canvas = within(canvasElement);

  expect(canvas.getAllByText('ADD')[0]).toBeVisible();

  await click(canvas.getAllByText('ADD')[0]);
};

async function click(el: Element) {
  await expect(el).toBeClickable();
  userEvent.click(el);
}

expect.extend({
  toBeClickable(el: Element) {
    return {
      pass: parseInt(getComputedStyle(el).width) > 100,
      message: () => `Element <${el.tagName.toLowerCase()}> is not clickable`,
    };
  },
});
