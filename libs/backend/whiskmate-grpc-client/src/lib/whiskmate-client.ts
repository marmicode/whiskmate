import { credentials } from '@grpc/grpc-js';
import { getProto } from '@whiskmate/backend/whiskmate-grpc-core';

export function getClient() {
  const { WhiskmateClient } = getProto();

  return new WhiskmateClient('localhost:4002', credentials.createInsecure());
}
