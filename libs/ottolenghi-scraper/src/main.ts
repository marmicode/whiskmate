import { scrapRecipeById } from './index';

async function main() {
  const recipeId = process.argv[2];

  if (recipeId == null) {
    console.error(`Please provide a recipe id:
    Usage: yarn scrap-ottolenghi RECIPE_ID
    `);
    return;
  }

  const recipe = await scrapRecipeById(recipeId);

  console.log(JSON.stringify(recipe));
}

main();
