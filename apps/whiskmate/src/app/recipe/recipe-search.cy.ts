import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getHarness } from '@jscutlery/cypress-harness';
import { mount } from 'cypress/angular';
import {
  RecipeSearchComponent,
  RecipeSearchModule,
} from './recipe-search.component';
import { RecipeSearchHarness } from './recipe-search.harness';

describe(RecipeSearchComponent.name, () => {
  const harness = getHarness(RecipeSearchHarness);

  beforeEach(() =>
    mount('<wm-recipe-search></wm-recipe-search>', {
      imports: [BrowserAnimationsModule, RecipeSearchModule],
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
