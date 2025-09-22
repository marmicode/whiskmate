import { Injectable } from '@angular/core';
import { Recipe } from '../recipe/recipe';

@Injectable({
  providedIn: 'root',
})
export class MealPlanner {
  private _recipes: Recipe[] = [];

  canAddRecipe(recipe: Recipe): boolean {
    return this._recipes.find((_recipe) => recipe.id === _recipe.id) == null;
  }

  getRecipes(): Recipe[] {
    return this._recipes;
  }

  addRecipe(recipe: Recipe) {
    if (!this.canAddRecipe(recipe)) {
      throw new Error(`Can't add recipe.`);
    }
    this._recipes = [...this._recipes, recipe];
  }
}
