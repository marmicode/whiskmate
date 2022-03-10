import { json } from 'body-parser';
import * as express from 'express';
import { recipeRouter } from './recipes/recipe.router';
import { NextFunction, Response } from 'express';
import {
  error,
  middleware as openapiMiddleware,
} from 'express-openapi-validator';
import { join } from 'path';

export const app = express();

app.use(json());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, req: unknown, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send({
    type: 'https://whiskmate.io/problems/unknown-error',
    title: 'Unknown Error',
  });
});

app.use(recipeRouter);
