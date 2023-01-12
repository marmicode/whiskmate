import { AsyncPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CatalogComponent } from './../shared/catalog.component';
import { Recipe } from './recipe';
import { RecipeFilter } from './recipe-filter';
import { RecipeFilterComponent } from './recipe-filter.component';
import { RecipePreviewComponent } from './recipe-preview.component';
import { RecipeRepository } from './recipe-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'wm-recipe-search',
  imports: [
    AsyncPipe,
    CatalogComponent,
    NgForOf,
    RecipeFilterComponent,
    RecipePreviewComponent,
  ],
  template: `
    <wm-recipe-filter
      (filterChange)="onFilterChange($event)"
    ></wm-recipe-filter>
    <wm-catalog>
      <wm-recipe-preview
        *ngFor="let recipe of recipes$ | async; trackBy: trackById"
        [recipe]="recipe"
      ></wm-recipe-preview>
    </wm-catalog>
  `,
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
