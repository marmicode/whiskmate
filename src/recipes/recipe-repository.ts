import { env } from 'process';
import { RecipeRepository } from './recipe-repository-common';
import { RecipeRepositoryMemory } from './recipe-repository-memory';
import { RecipeRepositoryMongodb } from './recipe-repository-mongodb';

let _recipeRepository: RecipeRepository;

export function getRecipeRepository(): RecipeRepository {
  if (_recipeRepository) {
    return _recipeRepository;
  }

  return (_recipeRepository =
    env.MONGODB_URI != null
      ? new RecipeRepositoryMongodb()
      : new RecipeRepositoryMemory());
}
