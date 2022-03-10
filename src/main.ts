import { env } from 'process';
import { setupIoServer } from './io';

/* Overrides Router class to catch async errors. */
require('express-async-errors');

async function main() {
  const { app } = await import('./app');

  const port = env.PORT ?? 3000;

  const httpServer = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });

  setupIoServer(httpServer);
}

main().catch((error) => console.error(error));
