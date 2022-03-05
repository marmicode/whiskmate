import { json } from 'body-parser';
import * as express from 'express';
import { NextFunction, Response } from 'express';
import { env } from 'process';
import { recipesRouter } from './recipes/recipes-router';

/* Overrides Router class to catch async errors. */
require('express-async-errors');

function main() {
  const app = express();
  const port = env.PORT ?? 3000;

  app.use(json());

  app.use(recipesRouter);

  app.use((err: unknown, req: unknown, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send({
      type: 'https://whiskmate.io/problems/unknown-error',
      title: 'Unknown Error',
    });
  });

  app.listen(port, () => {
    console.log(`Listenining at http://localhost:${port}`);
  });
}

main();
