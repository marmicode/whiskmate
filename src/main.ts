import { json } from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { NextFunction, Response } from 'express';
import {
  error,
  middleware as openapiMiddleware,
} from 'express-openapi-validator';
import { join } from 'path';
import { env } from 'process';

/* Overrides Router class to catch async errors. */
require('express-async-errors');

import { createAuthMiddleware } from './auth.middleware';
import { isAuthEnabled } from './config';
import { setupIoServer } from './io';
import { recipesRouter } from './recipes/recipes-router';

function main() {
  const app = express();
  const port = env.PORT ?? 3000;

  app.use(cors());

  if (isAuthEnabled) {
    app.use(createAuthMiddleware());
  }

  app.use(json());

  app.use(
    openapiMiddleware({
      apiSpec: join(__dirname, 'openapi/whiskmate.yaml'),
      validateRequests: true,
    })
  );

  app.use(recipesRouter);

  app.use((err: unknown, req: unknown, res: Response, next: NextFunction) => {
    console.error(err);

    if (err instanceof error.BadRequest) {
      res.status(err.status).send({
        type: 'https://whiskmate.io/problems/bad-request',
        detail: err.message,
        errors: err.errors,
      });
      return;
    }

    if (err instanceof error.NotFound) {
      res.status(err.status).send({
        type: 'https://whiskmate.io/problems/not-found',
        detail: err.message,
      });
      return;
    }

    res.status(500).send({
      type: 'https://whiskmate.io/problems/unknown-error',
      title: 'Unknown Error',
    });
  });

  const httpServer = app.listen(port, () => {
    console.log(`Listenining at http://localhost:${port}`);
  });

  setupIoServer(httpServer);
}

main();
