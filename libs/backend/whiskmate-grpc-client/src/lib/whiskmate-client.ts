import { credentials } from '@grpc/grpc-js';
import { getProto } from '@whiskmate/backend/whiskmate-grpc-core';

export function getClient() {
  const { Whiskmate } = getProto() as any;

  return new Whiskmate('localhost:4002', credentials.createInsecure());
}
