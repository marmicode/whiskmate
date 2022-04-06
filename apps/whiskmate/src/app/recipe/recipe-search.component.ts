import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CatalogModule } from './../shared/catalog.component';
import { Recipe } from './recipe';
import { RecipeFilter } from './recipe-filter';
import { RecipeFilterModule } from './recipe-filter.component';
import { RecipePreviewModule } from './recipe-preview.component';
import { RecipeRepository } from './recipe-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  template: ` <wm-recipe-filter
      (filterChange)="onFilterChange($event)"
    ></wm-recipe-filter>
    <wm-catalog>
      <wm-recipe-preview
        *ngFor="let recipe of recipes$ | async; trackBy: trackById"
        [recipe]="recipe"
      ></wm-recipe-preview>
    </wm-catalog>`,
})
export class RecipeSearchComponent {
  filter$ = new BehaviorSubject<RecipeFilter>({});
  recipes$ = this.filter$.pipe(
    switchMap((filter) => this._recipeRepository.search(filter))
  );

  constructor(private _recipeRepository: RecipeRepository) {}

  onFilterChange(filter: RecipeFilter) {
    this.filter$.next(filter);
  }

  trackById(_: number, recipe: Recipe) {
    return recipe.id;
  }
}

@NgModule({
  declarations: [RecipeSearchComponent],
  exports: [RecipeSearchComponent],
  imports: [
    CatalogModule,
    CommonModule,
    RecipeFilterModule,
    RecipePreviewModule,
  ],
})
export class RecipeSearchModule {}
