import { readdir, readFile, rm, writeFile } from 'fs/promises';
import { nanoid } from 'nanoid';
import { join } from 'path';
import { isErrorWithCode } from './helpers/is-error-with-code';
import {
  Recipe,
  RecipeData,
  RecipeNotFoundError,
  RecipeRepository,
} from './recipe-repository-common';

export class RecipeRepositoryFilesystem implements RecipeRepository {
  constructor(private _path: string) {}

  async addRecipe(recipeData: RecipeData) {
    const recipeId = nanoid();
    const path = this._getRecipePath(recipeId);
    await writeFile(path, JSON.stringify(recipeData));

    return {
      ...recipeData,
      id: recipeId,
    };
  }

  async getRecipes(): Promise<Recipe[]> {
    const paths = await readdir(this._path);
    const recipes = await Promise.all(
      paths.map(async (recipeId) => {
        const path = this._getRecipePath(recipeId);
        const content = await readFile(path, 'utf-8');
        const data = JSON.parse(content);
        return {
          ...data,
          id: recipeId,
        };
      })
    );
    return recipes;
  }

  async removeRecipe(recipeId: string) {
    try {
      await rm(this._getRecipePath(recipeId));
    } catch (e: unknown) {
      if (isErrorWithCode(e) && e.code === 'ENOENT') {
        throw new RecipeNotFoundError(recipeId);
      }
    }
  }

  private _getRecipePath(recipeId: string) {
    return join(this._path, recipeId);
  }
}
