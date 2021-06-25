import { getClient } from '@whiskmate/backend/whiskmate-grpc-client';
import { promisify } from 'util';
import { prompt } from 'inquirer';

async function main() {
  const { recipeId } = await prompt([
    {
      name: 'recipeId',
    },
  ]);

  const client = getClient();
  const response = await promisify(client.GetIngredients.bind(client))({
    recipeId,
  });
}

main();
