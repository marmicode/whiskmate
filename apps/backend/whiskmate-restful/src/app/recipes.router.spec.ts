import { getRecipes } from '@whiskmate/backend/whiskmate-core';
import * as express from 'express';
import * as request from 'supertest';
import { recipesRouter } from './recipes.router';

jest.mock('@whiskmate/backend/whiskmate-core');

const mockGetRecipes = getRecipes as jest.MockedFunction<typeof getRecipes>;

describe('sheep router', () => {
  it(`should return recipes`, async () => {
    givenDatabaseWorks();

    const app = createApp();

    const { status, body } = await request(app).get('/recipes');

    expect(status).toEqual(200);
    expect(body).toEqual([
      {
        id: 'babaganoush',
        name: 'Babaganoush',
      },
    ]);
  });

  it(`should retry automatically`, async () => {
    givenDatabaseBreaksThenRecovers();

    const app = createApp();

    const { status, body } = await request(app).get('/recipes');

    expect(status).toEqual(200);
    expect(body[0].id).toEqual('babaganoush');
  });
});

function createApp() {
  const app = express();
  app.use(recipesRouter);
  return app;
}

function givenDatabaseWorks() {
  mockGetRecipes.mockResolvedValue([
    {
      id: 'babaganoush',
      name: 'Babaganoush',
      ingredients: [],
      steps: [],
    },
  ]);
}

function givenDatabaseBreaksThenRecovers() {
  mockGetRecipes.mockRejectedValueOnce(new Error('🤯 Something went wrong.'));
  mockGetRecipes.mockResolvedValue([
    {
      id: 'babaganoush',
      name: 'Babaganoush',
      ingredients: [],
      steps: [],
    },
  ]);
}
