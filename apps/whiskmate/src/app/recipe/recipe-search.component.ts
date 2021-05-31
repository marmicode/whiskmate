import { switchMap } from 'rxjs/operators';
import { RecipeFilterModule } from './recipe-filter.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { defer, BehaviorSubject } from 'rxjs';
import { CatalogModule } from './../shared/catalog.component';
import { RecipePreviewModule } from './recipe-preview.component';
import { RecipeRepository } from './recipe-repository.service';
import { RecipeFilter } from './recipe-filter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  template: ` <wm-recipe-filter
      (filterChange)="onFilterChange($event)"
    ></wm-recipe-filter>
    <wm-catalog>
      <wm-recipe-preview
        *ngFor="let recipe of recipes$ | async"
        [recipe]="recipe"
      ></wm-recipe-preview>
    </wm-catalog>`,
})
export class RecipeSearchComponent {
  filter$ = new BehaviorSubject<RecipeFilter>({});
  recipes$ = defer(() =>
    this.filter$.pipe(
      switchMap((filter) => this._recipeRepository.search(filter))
    )
  );

  constructor(private _recipeRepository: RecipeRepository) {}

  onFilterChange(filter: RecipeFilter) {
    this.filter$.next(filter);
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
