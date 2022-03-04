import { nanoid } from 'nanoid';
import { Recipe, RecipeData, RecipeRepository } from './recipe-repository';

export class RecipeRepositoryFilesystem implements RecipeRepository {
  constructor(path: string) {}

  addRecipe(recipeData: RecipeData): Promise<Recipe> {
    throw new Error('🚧 Work in progress!');
  }

  getRecipes(): Promise<Recipe[]> {
    throw new Error('🚧 Work in progress!');
  }

  removeRecipe(recipeId: string): Promise<void> {
    throw new Error('🚧 Work in progress!');
  }
}
