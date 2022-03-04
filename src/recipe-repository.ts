export interface RecipeData {
  name: string;
}

export interface Recipe extends RecipeData {
  id: string;
}

export interface RecipeRepository {
  addRecipe(recipeData: RecipeData): Promise<Recipe>;
  getRecipes(): Promise<Recipe[]>;
  removeRecipe(recipeId: string): Promise<void>;
}

export class RecipeNotFoundError extends Error {
  constructor(recipeId: string) {
    super(`Recipe ${recipeId} not found.`);
    this.name = RecipeNotFoundError.name;
  }
}
