import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { rxComputed } from '@jscutlery/rx-computed';
import type { Recipe } from '../recipe/recipe';
import { MealPlanner } from './meal-planner';

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
export class RecipeAddButton {
  recipe = input.required<Recipe>();
  canAdd = rxComputed(() => this._mealPlanner.watchCanAddRecipe(this.recipe()));

  private _mealPlanner = inject(MealPlanner);

  addRecipe() {
    this._mealPlanner.addRecipe(this.recipe());
  }
}
