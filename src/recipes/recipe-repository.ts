import { RecipeRepository } from './recipe-repository-common';
import { RecipeRepositoryMemory } from './recipe-repository-memory';

let _recipeRepository: RecipeRepository;

export function getRecipeRepository(): RecipeRepository {
  return (_recipeRepository =
    _recipeRepository ?? new RecipeRepositoryMemory());
}
