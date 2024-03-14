import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { recipeMother } from '../testing/recipe.mother';
import { RecipeFilter } from './recipe-filter';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearchComponent } from './recipe-search.component';
import { render } from '@testing-library/angular';

describe(RecipeSearchComponent.name, () => {
  it('should search recipes without filtering', async () => {
    const { getRecipeNames } = await renderComponent();

    expect(getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  it('should search recipes using given filter', async () => {
    const { getRecipeNames, updateFilter } = await renderComponent();

    updateFilter({
      keywords: 'Burg',
      maxIngredientCount: 3,
    });

    expect(getRecipeNames()).toEqual(['Burger']);
  });

  async function renderComponent() {
    const { debugElement, detectChanges } = await render(
      RecipeSearchComponent,
      {
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [provideRecipeRepositoryFake()],
        configureTestBed(testBed) {
          testBed.overrideComponent(RecipeSearchComponent, {
            set: {
              imports: [CommonModule],
              schemas: [CUSTOM_ELEMENTS_SCHEMA],
            },
          });

          testBed
            .inject(RecipeRepositoryFake)
            .setRecipes([
              recipeMother.withBasicInfo('Burger').build(),
              recipeMother.withBasicInfo('Salad').build(),
            ]);
        },
      }
    );
    /* @hack trigger a second round of change detection after effects are flushed. */
    detectChanges();

    return {
      getRecipeNames() {
        return debugElement
          .queryAll(By.css('wm-recipe-preview'))
          .map((previewEl) => previewEl.properties.recipe.name);
      },
      updateFilter(filter: RecipeFilter) {
        debugElement
          .query(By.css('wm-recipe-filter'))
          .triggerEventHandler('filterChange', filter);
        detectChanges();
      },
    };
  }
});
