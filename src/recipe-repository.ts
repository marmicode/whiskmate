export interface Recipe {
  id: string;
  name: string;
}

export function createRecipe(recipe: Recipe): Recipe {
  return recipe;
}

export class RecipeRepository {
  private _recipes: Recipe[] = [];

  async addRecipe(recipe: Recipe) {
    this._recipes = [...this._recipes, recipe];
  }

  async getRecipes() {
    return this._recipes;
  }

  async removeRecipe(recipeId: string) {
    const previousCount = this._recipes.length;

    this._recipes = this._recipes.filter((recipe) => recipe.id !== recipeId);

    /* Check new recipes length to know if recipe has been removed. */
    if (previousCount === this._recipes.length) {
      throw new Error('Recipe not found.');
    }
  }
}
