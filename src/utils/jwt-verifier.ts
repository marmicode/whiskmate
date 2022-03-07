import { decode, JwtPayload, verify } from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';

export interface Claims extends JwtPayload {}

export interface JwtVerifier {
  verify(token: string): Claims;
}

export function createJwtVerifier(
  jwksUri: string,
  {
    audience,
    issuer,
    verifyExpiration = true,
  }: { audience?: string; issuer?: string; verifyExpiration?: boolean } = {}
): JwtVerifier {
  const jwkClient = jwksClient({ jwksUri });

  return {
    async verify(token) {
      const kid = decode(token, { complete: true })?.header?.kid;

      const key = await jwkClient.getSigningKey(kid);

      return verify(token, key.getPublicKey(), {
        algorithms: ['RS256'],
        audience,
        ignoreExpiration: !verifyExpiration,
        issuer,
      }) as JwtPayload;
    },
  };
}
