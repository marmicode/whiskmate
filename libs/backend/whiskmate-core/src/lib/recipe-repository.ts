import { join } from 'path';

/**
 * Return all recipes.
 */
export async function getRecipes({
  ingredientsCount,
}: { ingredientsCount?: number } = {}) {
  let recipes = (await loadData()).recipes;

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
  const recipes = (await loadData()).recipes;

  return recipes.find((recipe) => recipe.id === recipeId)?.ingredients;
}

export interface Recipe {
  id: string;
  description: string;
  ingredients: Ingredient[];
  name: string;
  steps: string[];
}

export interface Ingredient {
  name: string;
}

async function loadData() {
  /* @hack due to node builder using webpack and lowdb is an es6 module. */
  const { Low, JSONFile } = await import(/* webpackIgnore: true */ 'lowdb');
  const db = new Low(new JSONFile(join(__dirname, 'assets/db.json')));
  await db.read();
  return db.data as {
    recipes: Recipe[];
  };
}
