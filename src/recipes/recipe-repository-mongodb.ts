import { PrismaClient, Prisma } from '@prisma/client';
import {
  RecipeData,
  RecipeNotFoundError,
  RecipeRepository,
} from './recipe-repository-common';
import { Recipe } from '../openapi/model/recipe';

/* https://www.prisma.io/docs/reference/api-reference/error-reference#p2025 */
const PRISMA_RECORD_NOT_FOUND_CODE = 'P2025';

export class RecipeRepositoryMongodb implements RecipeRepository {
  private _prisma = new PrismaClient();

  async addRecipe(recipeData: RecipeData): Promise<Recipe> {
    return await this._prisma.recipe.create({
      data: recipeData,
      select: {
        id: true,
        name: true,
      },
    });
  }

  async getRecipes(): Promise<Recipe[]> {
    return await this._prisma.recipe.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async removeRecipe(recipeId: string) {
    try {
      await this._prisma.recipe.delete({
        where: {
          id: recipeId,
        },
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === PRISMA_RECORD_NOT_FOUND_CODE
      ) {
        throw new RecipeNotFoundError(recipeId);
      }

      throw err;
    }
  }
}
