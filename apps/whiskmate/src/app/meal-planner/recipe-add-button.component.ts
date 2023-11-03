import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Input,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Recipe } from '../recipe/recipe';
import { rxComputed } from '@jscutlery/rx-computed';
import { MealPlanner } from './meal-planner.service';

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
  @Input({ required: true }) set recipe(recipe: Recipe) {
    this._recipe.set(recipe);
  }

  canAdd = rxComputed(() =>
    this._mealPlanner.watchCanAddRecipe(this.recipeSig())
  );
  recipeSig = () => {
    const recipe = this._recipe();
    if (recipe === undefined) {
      throw new Error('signal read before initialization');
    }
    return recipe;
  };

  private _mealPlanner = inject(MealPlanner);
  private _recipe = signal<Recipe | undefined>(undefined);

  addRecipe() {
    this._mealPlanner.addRecipe(this.recipeSig());
  }
}
