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
