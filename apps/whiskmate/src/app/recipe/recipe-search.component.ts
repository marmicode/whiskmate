import { RecipePreviewModule } from './recipe-preview.component';
import { CatalogModule } from './../shared/catalog.component';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Recipe } from './recipe';
import { RecipeRepository } from './recipe-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  template: `<wm-catalog>
    <wm-recipe-preview
      *ngFor="let recipe of recipes; trackBy: trackById"
      [recipe]="recipe"
    ></wm-recipe-preview>
  </wm-catalog>`,
})
export class RecipeSearchComponent implements OnDestroy, OnInit {
  recipes?: Recipe[];

  private _destroyed$ = new ReplaySubject(1);

  constructor(private _recipeRepository: RecipeRepository) {}

  ngOnInit() {
    this._recipeRepository
      .search()
      .pipe(takeUntil(this._destroyed$))
      .subscribe((recipes) => (this.recipes = recipes));
  }

  ngOnDestroy() {
    this._destroyed$.next(undefined);
    this._destroyed$.complete();
  }

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
