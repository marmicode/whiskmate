import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CatalogComponent } from './catalog.component';

export default {
  title: 'CatalogComponent',
  component: CatalogComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<CatalogComponent>;

const Template: Story<CatalogComponent> = (args: CatalogComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
