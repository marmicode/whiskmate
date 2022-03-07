import { PrismaClient } from '@prisma/client';
import { RecipeData, RecipeRepository } from './recipe-repository-common';
import { Recipe } from '../openapi/model/recipe';

/* https://www.prisma.io/docs/reference/api-reference/error-reference#p2025 */
const PRISMA_RECORD_NOT_FOUND_CODE = 'P2025';

export class RecipeRepositoryMongodb implements RecipeRepository {
  private _prisma = new PrismaClient();

  async addRecipe(recipeData: RecipeData): Promise<Recipe> {
    throw new Error('🚧 work in progress!');
  }

  async getRecipes(): Promise<Recipe[]> {
    throw new Error('🚧 work in progress!');
  }

  async removeRecipe(recipeId: string) {
    throw new Error('🚧 work in progress!');
  }
}
