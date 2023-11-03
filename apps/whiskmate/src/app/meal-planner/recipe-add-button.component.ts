import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Recipe } from '../recipe/recipe';
import { rxComputed } from '@jscutlery/rx-computed';
import { MealPlanner } from './meal-planner.service';
import { safeSignal } from '../shared/safe-signal';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-add-button',
  imports: [MatButtonModule],
  template: `
    <button
      [disabled]="!canAdd()"
      (click)="addRecipe()"
      class="add-recipe-button"
      color="primary"
      mat-stroked-button
    >
      ADD
    </button>
  `,
  styles: [
    `
      .add-recipe-button {
        display: block;
        margin: auto;
      }
    `,
  ],
})
export class RecipeAddButtonComponent {
  @Input({ alias: 'recipe', required: true }) set _recipe(recipe: Recipe) {
    this.recipe.set(recipe);
  }
  canAdd = rxComputed(() => this._mealPlanner.watchCanAddRecipe(this.recipe()));
  recipe = safeSignal<Recipe>();

  private _mealPlanner = inject(MealPlanner);

  addRecipe() {
    this._mealPlanner.addRecipe(this.recipe());
  }
}
