import { loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { join } from 'path';

export function getProto() {
  const protoPath = join(__dirname, 'assets/whiskmate.proto');

  return loadPackageDefinition(
    loadSync(protoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    })
  );
}
