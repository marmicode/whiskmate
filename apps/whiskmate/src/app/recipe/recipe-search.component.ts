import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { CatalogModule } from './../shared/catalog.component';
import { Recipe } from './recipe';
import { RecipePreviewModule } from './recipe-preview.component';
import { RecipeRepository } from './recipe-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  template: `<wm-catalog>
    <wm-recipe-preview
      *ngFor="let recipe of recipes$ | async; trackBy: trackById"
      [recipe]="recipe"
    ></wm-recipe-preview>
  </wm-catalog>`,
})
export class RecipeSearchComponent {
  recipes$ = this._recipeRepository.search();

  constructor(private _recipeRepository: RecipeRepository) {}
  
  trackById(_: number, recipe: Recipe) {
    return recipe.id;
  }
}

@NgModule({
  declarations: [RecipeSearchComponent],
  exports: [RecipeSearchComponent],
  imports: [CatalogModule, CommonModule, RecipePreviewModule],
})
export class RecipeSearchModule {}
