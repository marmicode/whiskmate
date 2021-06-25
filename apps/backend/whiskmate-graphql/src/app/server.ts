import {
  getRecipes,
  getSimilarRecipes,
  Recipe,
} from '@whiskmate/backend/whiskmate-core';
import { ApolloServer, gql } from 'apollo-server';
import { truncate } from './truncate';

const typeDefs = gql`
  type Query {
    creators: [Creator]
    recipes: [Recipe]
  }

  type Recipe {
    creator: Creator
    name: String
    ingredients: [Ingredient]
    similarRecipes: [Recipe]
  }

  type Ingredient {
    name: String
    allergens: [String]
  }

  type Creator {
    favoriteIngredients: [Ingredient]
    recipes: [Recipe]
  }
`;

const resolvers = {
  Query: {
    recipes: () => getRecipes(),
  },
  Recipe: {
    name: (recipe: Recipe) => truncate(recipe.name, 50),
    similarRecipes: (recipe: Recipe) => getSimilarRecipes(recipe),
  },
};

export const server = new ApolloServer({ typeDefs, resolvers });
