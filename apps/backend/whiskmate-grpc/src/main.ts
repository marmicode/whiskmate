import { join } from 'path';
import {
  Server,
  ServerCredentials,
  loadPackageDefinition,
} from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';

import { promisify } from 'util';

const serviceImpl = {
  GetIngredients: (call, callback) => callback(null, {}),
};

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
async function main() {
  const protoPath = join(__dirname, 'assets/whiskmate.proto');

  const proto = loadPackageDefinition(
    loadSync(protoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    })
  );

  const server = new Server();
  server.addService(proto.Whiskmate['service'], serviceImpl);
  await promisify(server.bindAsync.bind(server))(
    '0.0.0.0:4002',
    ServerCredentials.createInsecure()
  );
  server.start();
}

main();
