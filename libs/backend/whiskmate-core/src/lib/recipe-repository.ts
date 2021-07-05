import * as shortid from 'shortid';
import { getDb } from './get-db';

/**
 * Add recipe.
 */
export async function addRecipe(recipeInfo: RecipeInfo) {
  const db = await getDb();

  const recipe = {
    ...recipeInfo,
    id: shortid(),
    ingredients: [],
    steps: [],
  };

  db.data.recipes.push(recipe);
  db.write();

  return recipe;
}

export async function getRecipe({ recipeId }: { recipeId: string }) {
  const db = await getDb();
  return db.data.recipes.find((recipe) => recipe.id === recipeId);
}

/**
 * Return all recipes.
 */
export async function getRecipes({
  ingredientsCount,
}: { ingredientsCount?: number } = {}) {
  const db = await getDb();
  let recipes = db.data.recipes;

  if (ingredientsCount != null) {
    recipes = recipes.filter(
      (recipe) => recipe.ingredients.length === ingredientsCount
    );
  }

  return recipes;
}

/**
 * Return similar recipes based on ingredient count.
 */
export async function getSimilarRecipes(recipe: Recipe) {
  const recipes = await getRecipes();

  return recipes.filter((_recipe) => {
    /* Ignore self. */
    if (recipe.id === _recipe.id) {
      return false;
    }

    /* Let's consider recipes with same number of ingredients as similar.*/
    return recipe.ingredients.length === _recipe.ingredients.length;
  });
}

/**
 * Return a recipe's ingredients.
 */
export async function getIngredients({ recipeId }: { recipeId: string }) {
  const db = await getDb();
  const recipes = db.data.recipes;

  return recipes.find((recipe) => recipe.id === recipeId)?.ingredients;
}

export interface RecipeInfo {
  name: string;
  description?: string;
}

export interface Recipe extends RecipeInfo {
  id: string;
  ingredients: Ingredient[];
  steps: string[];
}

export interface Ingredient {
  name: string;
}
