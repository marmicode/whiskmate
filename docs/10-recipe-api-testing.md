# Setup

```sh
git checkout origin/nodejs-18-recipe-api-testing-boilerplate

yarn
```

# 🎯 Goal: Implement tests for recipes API

- Test `GET /recipes` route.
- Test `DELETE /recipes/:recipeId` route.
- Test `DELETE /recipes/:recipeId` route with invalid recipe ID (should return 404).

# 📝 Steps

1. Run tests: `yarn test:watch` (or `npm run test:watch`).

2. Create test suite in `src/recipes/recipes-router.spec.ts`:

```ts
describe('Recipes Router', () => {

  it('should retrieve recipes', () => {
    ...
  });

});
```

3. Create an express app before each tests:

```ts
beforeEach(() => {
  const app = express();
  app.use(recipesRouter);
  ...
});
```

4. Create supertest client:

```ts
import * as supertest from 'supertest';

let client;

beforeEach(() => {
  const app = express();
  app.use(recipesRouter);
  client = supertest(app);
});
```

5. Use supertest client:

```ts
const { status, body } = await client.get('/recipes');
expect(status).toEqual(200);
...
```

6. Mock recipe repository singleton retriever and use new in-memory implementation instance for each test:

```ts
jest.mock('./recipe-repository');
const mockGetRecipeRepository = getRecipeRepository as jest.MockedFunction<
  typeof getRecipeRepository
>;

beforeEach(() => {
  const recipeRepository = new RecipeRepositoryMemory();
  mockGetRecipeRepository.mockReturnValue(recipeRepository);
});
```

# 🎁 Tips

## Partial matching

You can match objects partially with jest:

```ts
expect({ id: 'foo', name: 'Foo', address: '...' }).toEqual(
  expect.objectContaining({
    id: expect.any(String),
    name: 'Foo',
  })
);
```

## Async functions with beforeEach and it

`beforeEach` and `it` functions can be async.

```ts
beforeEach(async () => {
  await prepareSomething();
});
```
