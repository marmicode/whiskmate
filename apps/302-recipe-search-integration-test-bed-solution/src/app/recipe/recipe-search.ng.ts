import { RecipePreview } from './recipe-preview.ng';
import { Catalog } from '../shared/catalog.ng';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from './recipe';
import { RecipeRepository } from './recipe-repository';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  imports: [Catalog, RecipePreview],
  template: `
    <wm-catalog>
      @for (recipe of recipes; track recipe.id) {
        <wm-recipe-preview [recipe]="recipe" />
      }
    </wm-catalog>
  `,
})
export class RecipeSearch implements OnDestroy, OnInit {
  recipes?: Recipe[];

  private _cdr = inject(ChangeDetectorRef, { optional: true });
  private _recipeRepository = inject(RecipeRepository);
  private _subscription?: Subscription;

  ngOnInit() {
    this._subscription = this._recipeRepository
      .search()
      .subscribe((recipes) => {
        this.recipes = recipes;

        /* DO NOT DO THIS AT HOME.
         * This is just a hack to show the drawbacks of:
         * - "Isolated" testing
         * - Non-reactive code */
        this._cdr?.markForCheck();
      });
  }

  ngOnDestroy() {
    this._subscription?.unsubscribe();
  }
}
