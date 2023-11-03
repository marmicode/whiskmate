import { AsyncPipe, NgForOf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { CatalogComponent } from './../shared/catalog.component';
import { RecipePreviewComponent } from './recipe-preview.component';
import { Observable } from 'rxjs';
import { Recipe } from './recipe';
import { RecipeRepository } from './recipe-repository.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'wm-recipe-search',
  imports: [AsyncPipe, CatalogComponent, NgForOf, RecipePreviewComponent],
  template: `
    <wm-catalog>
      <wm-recipe-preview
        *ngFor="let recipe of recipes(); trackBy: trackById"
        [recipe]="recipe"
      ></wm-recipe-preview>
    </wm-catalog>
  `,
})
export class RecipeSearchComponent {
  recipes = toSignal(inject(RecipeRepository).search());

  trackById(_: number, recipe: Recipe) {
    return recipe.id;
  }
}
