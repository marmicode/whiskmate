import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RecipeFilter } from './recipe-filter';
import { RecipeFilterComponent } from './recipe-filter.component';
import { RecipePreviewComponent } from './recipe-preview.component';
import { RecipeRepository } from './recipe-repository.service';
import { rxComputed } from '@jscutlery/rx-computed';
import { CatalogComponent } from '../shared/catalog.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'wm-recipe-search',
  imports: [
    AsyncPipe,
    CatalogComponent,
    RecipeFilterComponent,
    RecipePreviewComponent,
  ],
  template: `
    <wm-recipe-filter (filterChange)="filter.set($event)"></wm-recipe-filter>
    <wm-catalog>
      @for (recipe of recipes(); track recipe.id) {
        <wm-recipe-preview [recipe]="recipe"/>
      }
    </wm-catalog>
  `,
})
export class RecipeSearchComponent {
  filter = signal<RecipeFilter>({});
  recipes = rxComputed(() => this._recipeRepository.search(this.filter()));

  private _recipeRepository = inject(RecipeRepository);
}
