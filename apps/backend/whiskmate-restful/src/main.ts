import { join } from 'path';
import { json } from 'body-parser';
import * as express from 'express';
import { recipesRouter } from './app/recipes.router';
import { middleware as openapiValidator } from 'express-openapi-validator';

const app = express();

app.use(json({ type: 'application/json' }));
// app.use(
//   openapiValidator({
//     apiSpec: join(__dirname, 'assets/whiskmate.yaml'),
//     validateRequests: true,
//   })
// );

app.use(recipesRouter);

app.use((err, req, res, next) => {
  const errorType = `https://errors.whiskmate.io/${
    err.errors?.[0]?.errorCode ?? 'unknown-error'
  }`;
  res.status(err.status ?? 500).json({
    type: errorType,
    title: err.message,
    errors: err.errors,
  });
});

const port = process.env.port ?? 4000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
