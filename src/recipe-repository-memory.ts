import { nanoid } from 'nanoid';
import {
  Recipe,
  RecipeData,
  RecipeRepository,
  RecipeNotFoundError,
} from './recipe-repository';

export class RecipeRepositoryMemory implements RecipeRepository {
  private _recipes: Recipe[] = [];

  async addRecipe(recipeData: RecipeData) {
    const recipe = { ...recipeData, id: nanoid() };
    this._recipes = [...this._recipes, recipe];
    return recipe;
  }

  async getRecipes() {
    return this._recipes;
  }

  async removeRecipe(recipeId: string) {
    const previousCount = this._recipes.length;

    this._recipes = this._recipes.filter((recipe) => recipe.id !== recipeId);

    /* Check new recipes length to know if recipe has been removed. */
    if (previousCount === this._recipes.length) {
      throw new RecipeNotFoundError(recipeId);
    }
  }
}
