import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { recipeMother } from '../testing/recipe.mother';
import { RecipeFilter } from './recipe-filter';
import { RecipeRepositoryFake } from './recipe-repository.fake';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeSearchComponent } from './recipe-search.component';

describe(RecipeSearchComponent.name, () => {
  it('should search recipes without filtering', () => {
    const { getRecipeNames } = renderComponent();

    expect(getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  it('should search recipes using given filter', () => {
    const { getRecipeNames, updateFilter } = renderComponent();

    updateFilter({
      keywords: 'Burg',
      maxIngredientCount: 3,
    });

    expect(getRecipeNames()).toEqual(['Burger']);
  });

  function renderComponent() {
    const fakeRepo = new RecipeRepositoryFake();

    fakeRepo.setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: RecipeRepository,
          useValue: fakeRepo,
        },
      ],
    });

    TestBed.overrideComponent(RecipeSearchComponent, {
      set: {
        imports: [CommonModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });

    const fixture = TestBed.createComponent(RecipeSearchComponent);
    fixture.detectChanges();

    return {
      getRecipeNames() {
        return fixture.debugElement
          .queryAll(By.css('wm-recipe-preview'))
          .map((previewEl) => previewEl.properties.recipe.name);
      },
      updateFilter(filter: RecipeFilter) {
        fixture.debugElement
          .query(By.css('wm-recipe-filter'))
          .triggerEventHandler('filterChange', filter);
        fixture.detectChanges();
      },
    };
  }
});
