import { RecipePreviewComponent } from './recipe-preview.component';
import { CatalogComponent } from '../shared/catalog.component';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from './recipe';
import { RecipeRepository } from './recipe-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'wm-recipe-search',
  imports: [CatalogComponent, RecipePreviewComponent],
  template: `
    <wm-catalog>
      @for (recipe of recipes; track recipe.id) {
        <wm-recipe-preview [recipe]="recipe"/>
      }
    </wm-catalog>
  `,
})
export class RecipeSearchComponent implements OnDestroy, OnInit {
  recipes?: Recipe[];

  private _recipeRepository = inject(RecipeRepository);
  private _subscription?: Subscription;

  ngOnInit() {
    this._subscription = this._recipeRepository
      .search()
      .subscribe((recipes) => (this.recipes = recipes));
  }

  ngOnDestroy() {
    this._subscription?.unsubscribe();
  }
}
