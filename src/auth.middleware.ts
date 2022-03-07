import { Handler } from 'express';

export function createAuthMiddleware({
  verifyExpiration = true,
}: { verifyExpiration?: boolean } = {}): Handler {
  throw new Error('🚧 work in progress!');
}
