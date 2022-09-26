import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { RecipePreviewComponent } from './recipe-preview.component';

export default {
  title: 'RecipePreviewComponent',
  component: RecipePreviewComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<RecipePreviewComponent>;

const Template: Story<RecipePreviewComponent> = (
  args: RecipePreviewComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
