import { decode, JwtPayload, verify } from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';
import * as memoize from 'memoizee';

export interface Claims extends JwtPayload {}

export interface JwtVerifier {
  verify(token: string): Claims;
}

export const createJwtVerifier = memoize(_createJwtVerifier);

function _createJwtVerifier(
  jwksUri: string,
  { verifyExpiration = true }: { verifyExpiration?: boolean } = {}
): JwtVerifier {
  const jwkClient = jwksClient({ jwksUri });

  return {
    async verify(token) {
      const kid = decode(token, { complete: true })?.header?.kid;

      const key = await jwkClient.getSigningKey(kid);

      return verify(token, key.getPublicKey(), {
        ignoreExpiration: !verifyExpiration,
      }) as JwtPayload;
    },
  };
}
