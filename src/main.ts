import { json } from 'body-parser';
import * as express from 'express';
import { env } from 'process';

/* Overrides Router class to catch async errors. */
require('express-async-errors');

function main() {
  const app = express();
  const port = env.PORT ?? 3000;

  app.use(json());

  app.get('/', (req, res) => {
    res.send('👋 Welcome!');
  });

  app.listen(port, () => {
    console.log(`Listenining at http://localhost:${port}`);
  });
}

main();
