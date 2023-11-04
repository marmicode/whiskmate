import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecipeSearchComponent } from './recipe-search.component';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { recipeMother } from '../testing/recipe.mother';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search-test-container',
  providers: [provideRecipeRepositoryFake()],
  imports: [RecipeSearchComponent],
  template: `
      <wm-recipe-search/>`,
})
export class RecipeSearchTestContainerComponent {
  private _recipeRepositoryFake = inject(RecipeRepositoryFake);

  constructor() {
    this._recipeRepositoryFake.setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);
  }
}
