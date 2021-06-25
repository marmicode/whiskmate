import { getClient } from '@whiskmate/backend/whiskmate-grpc-client';
import { prompt } from 'inquirer';

async function main() {
  const { recipeId } = await prompt([
    {
      name: 'recipeId',
    },
  ]);

  const { getIngredients } = getClient();

  const response = await getIngredients({ recipeId });

  console.log(response);
}

main();
