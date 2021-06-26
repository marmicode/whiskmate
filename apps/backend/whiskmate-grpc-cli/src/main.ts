import { getClient } from '@whiskmate/backend/whiskmate-grpc-client';
import { prompt } from 'inquirer';

async function main() {
  const { getRecipes, getIngredients } = getClient();

  const { recipes } = await getRecipes({});

  const { recipeId } = await prompt([
    {
      type: 'list',
      name: 'recipeId',
      message: 'Which recipe?',
      choices: recipes.map(({ id, name }) => ({ name, value: id })),
    },
  ]);

  const response = await getIngredients({ recipeId });

  for (const ingredient of response.ingredients) {
    console.log(`✅ ${ingredient.name}`);
  }
}

main();
