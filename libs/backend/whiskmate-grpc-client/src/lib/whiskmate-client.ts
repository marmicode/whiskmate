import { credentials } from '@grpc/grpc-js';
import { getProto } from '@whiskmate/backend/whiskmate-grpc-core';
import { promisify } from 'util';

export function getClient() {
  const { WhiskmateClient } = getProto();

  const client = new WhiskmateClient(
    'localhost:4002',
    credentials.createInsecure()
  );

  return {
    getIngredients: promisify(
      client.GetIngredients.bind(client) as typeof client.GetIngredients
    ),
    getRecipes: promisify(
      client.GetRecipes.bind(client) as typeof client.GetRecipes
    ),
  };
}
