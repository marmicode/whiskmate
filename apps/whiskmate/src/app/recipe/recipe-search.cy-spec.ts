import { getHarness } from '@jscutlery/cypress-harness';
import { RecipeSearchHarness } from './recipe-search.harness';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mount } from '@jscutlery/cypress-angular/mount';
import { RecipeSearchComponent } from './recipe-search.component';

describe(RecipeSearchComponent.name, () => {
  const harness = getHarness(RecipeSearchHarness);

  beforeEach(() =>
    mount(RecipeSearchComponent, {
      imports: [BrowserAnimationsModule],
      /* eslint-disable-next-line @typescript-eslint/no-var-requires */
      style: require('!!css-loader!../../styles.css').toString(),
    })
  );

  xit('should show recipes', () => {
    throw new Error('🚧 Work in progress!');
  });

  xit('should filter recipes', () => {
    throw new Error('🚧 Work in progress!');
  });

  xit('should disabled recipe once added', () => {
    throw new Error('🚧 Work in progress!');
  });
});
