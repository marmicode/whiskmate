/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { ApolloServer, gql } from 'apollo-server';
import { Recipe } from './../../whiskmate/src/app/recipe/recipe';
import { getRecipes, getSimilarRecipes } from './app/recipe-repository';
import { truncate } from './app/truncate';

async function main() {
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

  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await server.listen(process.env.port ?? 4000);
  console.log(`🚀  Server ready at ${url}`);
}

main();
