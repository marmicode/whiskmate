import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { defer } from 'rxjs';
import { CatalogModule } from './../shared/catalog.component';
import { RecipePreviewModule } from './recipe-preview.component';
import { RecipeRepository } from './recipe-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  template: `<wm-catalog>
    <wm-recipe-preview
      *ngFor="let recipe of recipes$ | async"
      [recipe]="recipe"
    ></wm-recipe-preview>
  </wm-catalog>`,
})
export class RecipeSearchComponent {
  recipes$ = defer(() => this._recipeRepository.search());

  constructor(private _recipeRepository: RecipeRepository) {}
}

@NgModule({
  declarations: [RecipeSearchComponent],
  exports: [RecipeSearchComponent],
  imports: [CatalogModule, CommonModule, RecipePreviewModule],
})
export class RecipeSearchModule {}
