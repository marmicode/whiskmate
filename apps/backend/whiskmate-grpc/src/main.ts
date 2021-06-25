import { Server, ServerCredentials } from '@grpc/grpc-js';
import {
  getProto,
  WhiskmateHandlers,
} from '@whiskmate/backend/whiskmate-grpc-core';
import { promisify } from 'util';

const serviceImpl: WhiskmateHandlers = {
  GetIngredients: (call, callback) => callback(null, {}),
};

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
async function main() {
  const server = new Server();

  const { whiskmateDefinition } = getProto();

  server.addService(whiskmateDefinition, serviceImpl);

  await promisify(server.bindAsync.bind(server))(
    '0.0.0.0:4002',
    ServerCredentials.createInsecure()
  );

  server.start();
}

main();
