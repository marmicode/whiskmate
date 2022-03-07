export interface JwtVerifier {
  verify(token: string): Record<string, any>;
}

export function createJwtVerifier(
  jwksUri: string,
  { verifyExpiration = true }: { verifyExpiration?: boolean } = {}
): JwtVerifier {
  throw new Error('🚧 work in progress!');
}
