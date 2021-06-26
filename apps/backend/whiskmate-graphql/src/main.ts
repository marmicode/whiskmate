import { server } from './app/server';

async function main() {
  const { url } = await server.listen(process.env.port ?? 4001);
  console.log(`🚀  Server ready at ${url}`);
}

main();
