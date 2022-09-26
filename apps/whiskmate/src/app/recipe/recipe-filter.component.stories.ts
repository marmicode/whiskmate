import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { RecipeFilterComponent } from './recipe-filter.component';

export default {
  title: 'RecipeFilterComponent',
  component: RecipeFilterComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<RecipeFilterComponent>;

const Template: Story<RecipeFilterComponent> = (
  args: RecipeFilterComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
