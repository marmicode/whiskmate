import { json } from 'body-parser';
import * as express from 'express';
import { recipesRouter } from './app/recipes.router';

const app = express();

app.use(json({ type: 'application/json' }));

app.use('/recipes', recipesRouter);

const port = process.env.port ?? 4000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
