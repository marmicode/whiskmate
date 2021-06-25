/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ApolloServer, gql } from 'apollo-server';

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
    recipes: () => [],
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(process.env.port ?? 4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
