import { loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { join } from 'path';
import { WhiskmateDefinition } from './assets/Whiskmate';
import { WhiskmateClient } from './assets/whiskmate';

export function getProto() {
  const protoPath = join(__dirname, 'assets/whiskmate.proto');

  const { Whiskmate } = loadPackageDefinition(
    loadSync(protoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    })
  );

  return {
    WhiskmateClient: (Whiskmate as unknown) as new (
      ...args: unknown[]
    ) => WhiskmateClient,
    whiskmateDefinition: (Whiskmate as any).service as WhiskmateDefinition,
  };
}
