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
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  template: `🚧 &lt;wm-recipe-search&gt;`,
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
