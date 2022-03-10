import { env } from 'process';

/* Overrides Router class to catch async errors. */
require('express-async-errors');

async function main() {
  const { app } = await import('./app');

  const port = env.PORT ?? 3000;

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
}

main().catch((error) => console.error(error));
